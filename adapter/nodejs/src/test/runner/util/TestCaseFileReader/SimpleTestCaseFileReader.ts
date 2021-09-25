import { readFile } from 'fs/promises'
import type { SocratestConfig } from '../../../../config'
import type { SocratestTestCase } from '../../../model'
import { SimpleFilePathResolver } from '../FilePathResolver'
import type { FilePathResolver } from '../FilePathResolver'
import type { TestCaseFileReader } from './interface'

export default class SimpleTestCaseFileReader implements TestCaseFileReader {
  private readonly filePathResolver: FilePathResolver

  constructor() {
    this.filePathResolver = new SimpleFilePathResolver()
  }
  
  input(
    config: SocratestConfig,
    testcase: SocratestTestCase,
  ): Promise<string> {
    return this.readFile(config, testcase.inputFileName)
  }

  output(
    config: SocratestConfig,
    testcase: SocratestTestCase,
  ): Promise<string> {
    return this.readFile(config, testcase.outputFileName)
  }

  private readFile(
    config: SocratestConfig,
    path: string,
  ): Promise<string> {
    return this.filePathResolver.resolve(config, path)
      .then((resolvedPath) => readFile(resolvedPath, { encoding: 'utf-8' }))
  }
}
