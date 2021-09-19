import autobind from 'autobind-decorator'
import type { SocratestTestTarget } from '../../config'
import type { SocratestTestCase } from '../model'
import type {
  SocratestTestCaseRunner,
  SocratestTestCaseResult,
} from './interface'

@autobind
export default class MockTestCaseRunner implements SocratestTestCaseRunner {
  run(
    target: SocratestTestTarget,
    testcase: SocratestTestCase,
  ): Promise<SocratestTestCaseResult> {
    return Promise.resolve({
      id: testcase.id,
      name: testcase.name,
      result: true,
    })
  }
}
