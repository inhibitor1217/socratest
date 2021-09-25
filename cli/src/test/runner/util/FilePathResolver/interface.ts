import type { SocratestConfig } from '../../../../config'

export interface FilePathResolver {
  resolve(
    config: SocratestConfig,
    path: string,
  ): Promise<string>
}
