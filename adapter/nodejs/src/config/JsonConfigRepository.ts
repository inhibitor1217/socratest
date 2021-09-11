import autobind from 'autobind-decorator'
import { readFile } from 'fs/promises'
import _ from 'lodash'
import {
  InvalidConfigException,
  UnavailableConfigException,
} from './exception'
import type {
  SocratestConfig,
  SocratestConfigValidator,
  SocratestConfigRepository,
} from './interface'
import { ConfigSchemaValidator } from './validator'

interface JsonConfigRepositoryOptions {
  schemaValidator: SocratestConfigValidator
}

@autobind
export default class JsonConfigRepository implements SocratestConfigRepository {
  readonly configFile: string
  readonly options: JsonConfigRepositoryOptions
  
  constructor(
    configFile: string,
    options?: JsonConfigRepositoryOptions
  ) {
    this.configFile = configFile
    this.options = options ?? {
      schemaValidator: new ConfigSchemaValidator(),
    }
  }

  get config(): Promise<SocratestConfig> {
    return this.readConfigFile()
      .then(this.options.schemaValidator.validationPipe)
      .catch(this.handleSchemaValidationException)
  }

  private readConfigFile(): Promise<any> {
    return readFile(this.configFile)
      .then((buffer) => buffer.toString())
      .then(JSON.parse)
      .catch((e) => { throw new UnavailableConfigException(e) })
  }

  private handleSchemaValidationException(e: any): never {
    if (e instanceof InvalidConfigException) {
      throw e.appendMessage(`Check your configuration file: ${this.configFile}`)
    }

    throw e
  }
}
