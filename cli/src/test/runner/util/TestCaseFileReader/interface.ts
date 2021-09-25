import type { SocratestConfig } from '../../../../config'
import type { SocratestTestCase } from '../../../model'

export interface TestCaseFileReader {
  input(
    config: SocratestConfig,
    testcase: SocratestTestCase,
  ): Promise<string>

  output(
    config: SocratestConfig,
    testcase: SocratestTestCase,
  ): Promise<string>
}
