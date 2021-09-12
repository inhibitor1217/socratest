import _ from 'lodash'
import { get } from 'lodash/fp'
import { ConfigRepositoryFactory } from './config'
import { SimpleTestRunnerResultFormatter } from './logger/formatter'
import { ConsoleWriter } from './logger/writer'
import { CommandLineOptionsRepository } from './options'
import { TestRepositoryFactory } from './test/repository'
import { MockTestRunner } from './test/runner'
import { BaseError } from './util/error'
import { BaseException } from './util/exception'
import {
  instance,
  requires,
  value,
} from './util/pipe'

export async function execute(argv: string[]): Promise<number> {
  const writer = new ConsoleWriter()
  const runner = new MockTestRunner()
  const formatter = new SimpleTestRunnerResultFormatter()

  return Promise.resolve(argv)
      .then(instance(CommandLineOptionsRepository))
      .then(get('options'))
      .then(requires)
      .then(ConfigRepositoryFactory.from)
      .then(get('config'))
      .then(get('provider'))
      .then(requires)
      .then(TestRepositoryFactory.from)
      .then(get('tests'))
      .then(requires)
      .then(runner.run)
      .then(formatter.format)
      .then(writer.log)
      .then(value(0))
      .catch((e) => {
        writer.warn('Program encountered an exception during execution.\n')

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
      })
}
