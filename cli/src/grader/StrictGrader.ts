import type { SocratestTest } from '../test/model'
import type { SocratestTestRunnerResult } from '../test/runner'
import type { SocratestGrader } from './interface'

export default class StrictGrader implements SocratestGrader {
  grade(
    tests: SocratestTest[],
    result: SocratestTestRunnerResult,
  ): Promise<boolean> {
    const passedAllTests = result.count.test.executed === result.count.test.pass
    const passedAllTestCases = result.count.testcase.executed === result.count.testcase.pass
    return Promise.resolve(passedAllTests && passedAllTestCases)
  }
}
