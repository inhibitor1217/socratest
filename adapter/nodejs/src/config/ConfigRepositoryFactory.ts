import path from 'path'
import type { SocratestOptions } from '../options'
import { UnsupportedConfigException } from './exception'
import type { SocratestConfigRepository, SocratestConfigRepositoryFactory } from './interface'
import JsonConfigRepository from './JsonConfigRepository'

class ConfigRepositoryFactory implements SocratestConfigRepositoryFactory {
  from(options: SocratestOptions): SocratestConfigRepository {
    const { config } = options
    const configExtension = path.extname(config)

    switch (configExtension) {
      case '.json':
        return new JsonConfigRepository(config)
      default:
        throw new UnsupportedConfigException(`Configuration file is not in supported format: supported types are [.json], but got: ${config}`)
    }
  }
}

export default new ConfigRepositoryFactory()
