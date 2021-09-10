import { NotImplementedError } from '../util/error'
import type { SocratestConfig, SocratestConfigRepository } from './interface'

export default class JsonConfigRepository implements SocratestConfigRepository {
  constructor(configFile: string) {

  }

  get config(): Promise<SocratestConfig> {
    throw new NotImplementedError()
  }
}
