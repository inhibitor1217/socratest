import autobind from 'autobind-decorator'
import {
  flow,
  get,
} from 'lodash/fp'
import type {
  SocratestTest,
  SocratestTestCase,
} from '../../model'
import type {
  SocratestTestCaseResult,
  SocratestTestResult,
  SocratestTestRunner,
  SocratestTestRunnerResult,
} from '../interface'

@autobind
export default class JsNativeTestRunner implements SocratestTestRunner {
  run(tests: SocratestTest[]): Promise<SocratestTestRunnerResult> {
    return Promise.all(tests.map(this.runTest))
      .then((testResults) => ({
        count: {
          test: this.composeTestCount(tests, testResults),
          testcase: this.composeTestCaseCount(tests, testResults),
        },
        tests: testResults,
      }))
  }

  private runTest(test: SocratestTest): Promise<SocratestTestResult> {
    return Promise.all(test.cases.items.map(this.runTestCase))
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

  private runTestCase(testcase: SocratestTestCase): Promise<SocratestTestCaseResult> {
    return Promise.resolve({
      id: testcase.id,
      name: testcase.name,
      result: true,
    })
  }

  private composeTestCount(
    tests: SocratestTest[],
    results: SocratestTestResult[],
  ): SocratestTestRunnerResult['count']['test'] {
    return {
      total: tests.length,
      executed: results.length,
      pass: results.filter(get('result')).length,
      fail: results.filter(flow(get('result'), v => !v)).length,
    }
  }

  private composeTestCaseCount(
    tests: SocratestTest[],
    results: SocratestTestResult[],
  ): SocratestTestRunnerResult['count']['testcase'] {
    return {
      total: tests.reduce((acc, test) => acc + test.cases.size, 0),
      executed: results.reduce((acc, testResult) => acc + testResult.count.executed, 0),
      pass: results.reduce((acc, testResult) => acc + testResult.count.pass, 0),
      fail: results.reduce((acc, testResult) => acc + testResult.count.fail, 0),
    }
  }
}
