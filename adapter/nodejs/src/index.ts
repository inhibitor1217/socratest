import _ from 'lodash'
import { ConfigRepositoryFactory } from './config'
import { ConsoleWriter } from './logger/writer'
import { CommandLineOptionsRepository } from './options'
import {
  MockTestRunner,
  TestRepositoryFactory,
} from './test'
import { BaseError } from './util/error'
import { BaseException } from './util/exception'

export async function execute(argv: string[]): Promise<number> {
  const writer = new ConsoleWriter()

  try {
    const args = new CommandLineOptionsRepository(argv).options
    const config = await ConfigRepositoryFactory.from(args).config
    const testRepository = TestRepositoryFactory.from(config.provider)
    
    const runner = new MockTestRunner()
    const result = await runner.run(await testRepository.tests)

    writer.log(result.toString())

    return 0
  } catch (e) {
    writer.warn(`Program encountered an exception during execution.
    `)

    if (e instanceof BaseException) {
      writer.warn(`${e.name}: ${e.message}`)
      return e.returnCode
    }

    if (e instanceof BaseError) {
      writer.error(e.stack ?? '')
      return e.returnCode
    }

    writer.error('An unexpected error occurred:')
    writer.error((e as any).toString())
    return -1
  }
}
