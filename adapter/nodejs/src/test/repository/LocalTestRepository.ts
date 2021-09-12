import autobind from 'autobind-decorator'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import {
  get,
  map,
} from 'lodash/fp'
import type { SocratestLocalTestProvider } from '../../config'
import { LocalTestInfoNotFoundError } from '../error'
import { SocratestTest } from '../model'
import type { SocratestTestRepository } from './interface'

@autobind
export default class LocalTestRepository implements SocratestTestRepository {
  readonly config: SocratestLocalTestProvider

  private static readonly infoFileName = 'info.json'

  constructor(config: SocratestLocalTestProvider) {
    this.config = config
  }

  get tests(): Promise<SocratestTest[]> {
    return this.readTestInfo()
      .then(get('tests'))
      // TODO: add validation of DTO
      .then(map((dto: any) => new SocratestTest(dto)))
  }

  private readTestInfo(): Promise<any> {
    return readFile(resolve(process.cwd(), this.config.location, LocalTestRepository.infoFileName))
      .then((buffer) => buffer.toString())
      .then(JSON.parse)
      .catch((e) => { throw new LocalTestInfoNotFoundError() })
  }
}
