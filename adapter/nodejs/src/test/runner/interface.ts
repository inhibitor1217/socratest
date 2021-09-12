import type { SocratestTest } from '../model'

export interface SocratestTestCaseResult {
  id: string
  name: string
  result: boolean
}

export interface SocratestTestResult {
  id: string
  name: string
  result: boolean
  count: {
    total: number
    executed: number
    pass: number
    fail: number
  }
  cases: SocratestTestCaseResult[]
}

export interface SocratestTestRunnerResult {
  count: {
    test: {
      total: number
      executed: number
      pass: number
      fail: number
    },
    testcase: {
      total: number
      executed: number
      pass: number
      fail: number
    }
  }
  tests: SocratestTestResult[]
}

export interface SocratestTestRunner {
  run(tests: SocratestTest[]): Promise<SocratestTestRunnerResult>
}
