import type { SocratestTestRunnerResult } from '../../../test/runner'

export interface TestRunnerResultFormatter {
  format(result: SocratestTestRunnerResult): string
}
