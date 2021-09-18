import autobind from 'autobind-decorator'
import _ from 'lodash'
import {
  flow,
  get,
  map,
  size,
  sum,
  sumBy,
} from 'lodash/fp'
import type {
  SocratestConfig,
  SocratestTestTarget,
} from '../../../config'
import { TargetNotFoundException } from '../../exception'
import type {
  SocratestTestCaseResult,
  SocratestTestResult,
  SocratestTestRunner,
  SocratestTestRunnerResult,
} from '../interface'
import type {
  SocratestTest,
  SocratestTestCase,
} from '../../model'
import { compose } from '../../../util/pipe'

interface SocratestTestExecution {
  target: SocratestTestTarget
  test: SocratestTest
  result: SocratestTestResult
}

@autobind
export default class JsNativeTestRunner implements SocratestTestRunner {
  readonly config: SocratestConfig

  constructor(config: SocratestConfig) {
    this.config = config
  }

  run(tests: SocratestTest[]): Promise<SocratestTestRunnerResult> {
    return Promise.all(
      this.config.targets
        .map((target) => this.findTest(tests, target)
          .then((test) => ({ target, test }))
          .then(({ target, test }) => this.runTest(target, test)
            .then((result) => ({ target, test, result }))))
    )
      .then(compose({
        count: {
          test: this.composeTestCount,
          testcase: this.composeTestCaseCount,
        },
        tests: flow(map(get('test'))),
      }))
  }

  private findTest(
    tests: SocratestTest[],
    target: SocratestTestTarget,
  ): Promise<SocratestTest> {
    const test = tests.find((test) => test.id === target.test || test.name === target.test) ?? null

    if (_.isNil(test)) {
      throw new TargetNotFoundException(target.test)
    }

    return Promise.resolve(test)
  }

  private runTest(
    target: SocratestTestTarget,
    test: SocratestTest,
  ): Promise<SocratestTestResult> {
    return Promise.all(test.cases.items.map((testcase) => this.runTestCase(target, testcase)))
      .then((caseResults) => ({
        id: test.id,
        name: test.name,
        result: (
          test.cases.size === caseResults.length &&
          caseResults.every(get('result'))
        ),
        count: {
          total: test.cases.size,
          executed: caseResults.length,
          pass: caseResults.filter(get('result')).length,
          fail: caseResults.filter(flow(get('result'), v => !v)).length,
        },
        cases: caseResults,
      }))
  }

  private runTestCase(
    target: SocratestTestTarget,
    testcase: SocratestTestCase,
  ): Promise<SocratestTestCaseResult> {
    return Promise.resolve({
      id: testcase.id,
      name: testcase.name,
      result: true,
    })
  }

  private composeTestCount(executions: SocratestTestExecution[]): SocratestTestRunnerResult['count']['test'] {
    return compose({
      total: size,
      executed: size,
      pass: sumBy(flow(get('result.result'), Number)),
      fail: sumBy(flow(get('result.result'), v => !v, Number)),
    })(executions)
  }

  private composeTestCaseCount(executions: SocratestTestExecution[]): SocratestTestRunnerResult['count']['testcase'] {
    return compose({
      total: flow(map(get('test.cases.size')), sum),
      executed: flow(map(get('result.count.executed')), sum),
      pass: flow(map(get('result.count.pass')), sum),
      fail: flow(map(get('result.count.fail')), sum),
    })(executions)
  }
}
