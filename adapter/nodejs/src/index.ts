import _ from 'lodash'
import { CommandLineOptionsRepository } from './options'
import { BaseError, NotImplementedError } from './util/error'
import { BaseException } from './util/exception'

export async function execute(argv: string[]): Promise<number> {
  try {
    const args = new CommandLineOptionsRepository(argv).options
    console.log(args.config)

    return 0
  } catch (e) {
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
