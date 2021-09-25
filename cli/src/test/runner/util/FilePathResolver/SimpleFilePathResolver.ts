import autobind from 'autobind-decorator'
import { resolve } from 'path'
import type { SocratestConfig } from '../../../../config'
import type { FilePathResolver } from './interface'

@autobind
export default class SimpleFilePathResolver implements FilePathResolver {
  resolve(
    config: SocratestConfig,
    path: string,
  ): Promise<string> {
    return Promise.resolve(resolve(config.provider.location, path))
  }
}
