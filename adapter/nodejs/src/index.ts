import _ from 'lodash'
import { ConfigRepositoryFactory } from './config'
import { CommandLineOptionsRepository } from './options'
import {
  MockTestRunner,
  TestRepositoryFactory,
} from './test'
import { BaseError } from './util/error'
import { BaseException } from './util/exception'

export async function execute(argv: string[]): Promise<number> {
  try {
    const args = new CommandLineOptionsRepository(argv).options
    const config = await ConfigRepositoryFactory.from(args).config
    const testRepository = TestRepositoryFactory.from(config.provider)
    
    const runner = new MockTestRunner()
    const result = await runner.run(await testRepository.tests)

    console.log(result)

    return 0
  } catch (e) {
    console.warn(`Program encountered an exception during execution.
    `)

    if (e instanceof BaseException) {
      console.warn(`${e.name}: ${e.message}`)
      return e.returnCode
    }

    if (e instanceof BaseError) {
      console.error(e.stack)
      return e.returnCode
    }

    console.error('An unexpected error occurred:')
    console.error(e)
    return -1
  }
}
