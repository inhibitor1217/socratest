import type { SocratestTest } from '../../model';
import type {
  SocratestTestRunner,
  SocratestTestRunnerResult,
} from '../interface'

export default class MockTestRunner implements SocratestTestRunner {
  run(tests: SocratestTest[]): Promise<SocratestTestRunnerResult> {
    return Promise.resolve({
      count: {
        test: {
          total: tests.length,
          executed: tests.length,
          pass: tests.length,
          fail: 0,
        },
        testcase: {
          total: tests.reduce((acc, test) => acc + test.cases.size, 0),
          executed: tests.reduce((acc, test) => acc + test.cases.size, 0),
          pass: tests.reduce((acc, test) => acc + test.cases.size, 0),
          fail: 0,
        },
      },
      tests: tests.map((test) => ({
        id: test.id,
        name: test.name,
        result: true,
        count: {
          total: test.cases.size,
          executed: test.cases.size,
          pass: test.cases.size,
          fail: 0,
        },
        cases: test.cases.map((testcase) => ({
          id: testcase.id,
          name: testcase.name,
          result: true,
        })),
      })),
    })  
  }
}
