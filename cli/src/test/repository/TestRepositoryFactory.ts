import { SocratestTestProviderType } from '../../config'
import unreachable from '../../util/unreachable'
import type { SocratestTestProvider } from '../../config'
import LocalTestRepository from './LocalTestRepository'
import type { SocratestTestRepository } from './interface'

class TestRepositoryFactory {
  from(config: SocratestTestProvider): SocratestTestRepository {
    if (config.type.is(SocratestTestProviderType.Local)) {
      return new LocalTestRepository(config)
    }

    unreachable()
  }
}

export default new TestRepositoryFactory()
