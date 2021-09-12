import type { SocratestTest } from '../../model';
import type {
  SocratestTestRunner,
  SocratestTestRunnerResult,
} from '../interface'

export default class MockTestRunner implements SocratestTestRunner {
  run(tests: SocratestTest[]): Promise<SocratestTestRunnerResult> {
    return Promise.resolve({
      count: {
        total: tests.length,
        executed: tests.length,
        pass: tests.length,
        fail: 0,
      },
      tests: tests.map((test) => ({ id: test.id, name: test.name, result: true })),
    })  
  }
}
