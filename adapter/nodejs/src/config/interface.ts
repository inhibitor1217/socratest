import type { SocratestOptions } from '../options'

export interface SocratestTestTarget {
  test: string
  function: string
}

export interface SocratestConfig {
  platform: 'nodejs'
  targets: SocratestTestTarget[]
}

export interface SocratestConfigRepository {
  get config(): Promise<SocratestConfig>
}

export interface SocratestConfigRepositoryFactory {
  from(options: SocratestOptions): SocratestConfigRepository
}
