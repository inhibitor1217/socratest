import type { SocratestTest } from '../model'

export interface SocratestTestResult {
  id: string
  name: string
  result: boolean
}

export interface SocratestTestRunnerResult {
  count: {
    total: number
    executed: number
    pass: number
    fail: number
  }
  tests: SocratestTestResult[]
}

export interface SocratestTestRunner {
  run(tests: SocratestTest[]): Promise<SocratestTestRunnerResult>
}
