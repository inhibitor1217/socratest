import type { SocratestTest } from '../model'

export interface SocratestTestRepository {
  readonly tests: Promise<SocratestTest[]>
}
