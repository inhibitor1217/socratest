import { extend } from '../../util/enum'

enum SocratestTestProviderType {
  Local = 'local',
}

export class SocratestTestProviderTypeExtension extends
  extend<SocratestTestProviderType>('SocratestTestProviderType', SocratestTestProviderType) {}

export default SocratestTestProviderType
