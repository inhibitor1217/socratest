import type { SocratestOptions } from '../options'
import type {
  SocratestTestProviderType,
  SocratestTestProviderTypeExtension,
} from './const'

export interface SocratestTestTarget {
  test: string
  function: string
}

export interface BaseSocratestTestProvider {
  type: SocratestTestProviderTypeExtension
}

export interface SocratestLocalTestProvider extends BaseSocratestTestProvider {
  type: SocratestTestProviderTypeExtension & { value: SocratestTestProviderType.Local }
  location: string
}

export type SocratestTestProvider = SocratestLocalTestProvider

export interface SocratestConfig {
  platform: 'nodejs'
  targets: SocratestTestTarget[]
  provider: SocratestTestProvider
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
