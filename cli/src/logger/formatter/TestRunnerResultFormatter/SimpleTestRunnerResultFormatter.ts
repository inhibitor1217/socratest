import autobind from 'autobind-decorator'
import type { SocratestTestRunnerResult } from '../../../test/runner'
import type { TestRunnerResultFormatter } from './interface'

@autobind
export default class SimpleTestRunnerResultFormatter implements TestRunnerResultFormatter {
  format(result: SocratestTestRunnerResult): string {
    return this.formatCount(result.count)
  }

  private formatCount(count: SocratestTestRunnerResult['count']): string {
    return [this.formatTestCount(count.test), this.formatTestCaseCount(count.testcase)].join('\n')
  }

  private formatTestCount(test: SocratestTestRunnerResult['count']['test']): string {
    const { total, executed, pass, fail } = test
    return `Found ${total} tests (${executed} executed, ${pass} passed, ${fail} failed).`
  }

  private formatTestCaseCount(testcase: SocratestTestRunnerResult['count']['testcase']): string {
    const { total, executed, pass, fail } = testcase
    return `Found ${total} testcases (${executed} executed, ${pass} passed, ${fail} failed).`

  }
}
