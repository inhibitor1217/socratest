import autobind from 'autobind-decorator'
import _ from 'lodash'
import unreachable from '../../../util/unreachable'
import { SocratestTestProviderType, SocratestTestProviderTypeExtension } from '../../const'
import { InvalidConfigException } from '../../exception'
import type { SocratestTestProvider } from '../../interface'
import LocalProviderConfigSchemaValidator from './LocalProviderConfigSchemaValidator'
import type { ProviderConfigSchemaValidator } from './interface'

@autobind
class ProviderConfigSchemaValidatorFactory {
  from(config: any): ProviderConfigSchemaValidator<SocratestTestProvider> {
    try {
      const type = SocratestTestProviderTypeExtension.parse(_.get(config, 'type'))

      if (type.is(SocratestTestProviderType.Local)) {
        return new LocalProviderConfigSchemaValidator()
      }

      unreachable()
    } catch (e) {
      if (e instanceof TypeError) {
        throw new InvalidConfigException('provider.type', e.message)
      }

      throw e
    }
  }
}

export default new ProviderConfigSchemaValidatorFactory()
