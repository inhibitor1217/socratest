import type { SocratestTest } from '../test/model'
import type { SocratestTestRunnerResult } from '../test/runner'

export interface SocratestGrader {
  grade(tests: SocratestTest[], result: SocratestTestRunnerResult): Promise<boolean>
}
