import autobind from 'autobind-decorator'
import _ from 'lodash'
import { SocratestTestProviderTypeExtension } from '../..'
import { InvalidConfigException } from '../../exception'
import type { SocratestLocalTestProvider } from '../../interface'
import type { ProviderConfigSchemaValidator } from './interface'

@autobind
export default class LocalProviderConfigSchemaValidator
  implements ProviderConfigSchemaValidator<SocratestLocalTestProvider> {
  validationPipe(config: any): SocratestLocalTestProvider {
    this.validate(config)
    return config
  }

  validate(config: any): asserts config is SocratestLocalTestProvider {
    _.set(config, 'type', new SocratestTestProviderTypeExtension(_.get(config, 'type')))
    
    const location = _.get(config, 'location')
    
    if (!_.isString(location) || _.isEmpty(location)) {
      throw new InvalidConfigException('provider.location', 'should be nonempty string')
    }
  }
}
