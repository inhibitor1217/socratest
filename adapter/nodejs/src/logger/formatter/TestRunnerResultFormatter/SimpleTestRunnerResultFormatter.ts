import autobind from 'autobind-decorator'
import type { SocratestTestRunnerResult } from '../../../test/runner'
import type { TestRunnerResultFormatter } from './interface'

@autobind
export default class SimpleTestRunnerResultFormatter implements TestRunnerResultFormatter {
  format(result: SocratestTestRunnerResult): string {
    return 'hello'
  }
}
