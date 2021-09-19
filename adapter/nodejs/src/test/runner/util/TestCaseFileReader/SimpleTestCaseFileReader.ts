import { readFile } from 'fs/promises'
import { resolve } from 'path'
import type { SocratestConfig } from '../../../../config'
import type { SocratestTestCase } from '../../../model'
import type { TestCaseFileReader } from './interface'

export default class SimpleTestCaseFileReader implements TestCaseFileReader {
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
    return readFile(resolve(config.provider.location, path), 'utf-8')
  }
}
