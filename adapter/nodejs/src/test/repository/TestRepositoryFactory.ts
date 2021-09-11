import { SocratestTestProviderType } from '../../config'
import unreachable from '../../util/unreachable'
import type { SocratestTestProvider } from '../../config'
import type { SocratestTestRepository } from '../interface'
import LocalTestRepository from './LocalTestRepository'

class TestRepositoryFactory {
  from(config: SocratestTestProvider): SocratestTestRepository {
    if (config.type.is(SocratestTestProviderType.Local)) {
      return new LocalTestRepository(config)
    }

    unreachable()
  }
}

export default new TestRepositoryFactory()
