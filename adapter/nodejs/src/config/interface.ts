import type { SocratestOptions } from '../options'

export interface SocratestTestTarget {
  test: string
  function: string
}

export interface SocratestConfig {
  platform: 'nodejs'
  targets: SocratestTestTarget[]
}

export interface SocratestConfigValidator {
  validate(config: any): asserts config is SocratestConfig
  validationPipe(config: any): SocratestConfig
}

export interface SocratestConfigRepository {
  get config(): Promise<SocratestConfig>
}

export interface SocratestConfigRepositoryFactory {
  from(options: SocratestOptions): SocratestConfigRepository
}
