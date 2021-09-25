import type { BaseSocratestTestProvider } from '../../interface'

export interface ProviderConfigSchemaValidator<T extends BaseSocratestTestProvider> {
  validate(config: any): asserts config is T
  validationPipe(config: any): T
}
