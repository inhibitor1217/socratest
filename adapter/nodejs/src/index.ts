import _ from 'lodash'
import { get } from 'lodash/fp'
import { ConfigRepositoryFactory } from './config'
import { StrictGrader } from './grader'
import { SimpleTestRunnerResultFormatter } from './logger/formatter'
import { ConsoleWriter } from './logger/writer'
import { CommandLineOptionsRepository } from './options'
import { TestRepositoryFactory } from './test/repository'
import { MockTestRunner } from './test/runner'
import { RETURN_CODES } from './util/const'
import { BaseError } from './util/error'
import { BaseException } from './util/exception'
import {
  instance,
  requires,
} from './util/pipe'

export async function execute(argv: string[]): Promise<number> {
  const writer = new ConsoleWriter()
  const runner = new MockTestRunner()
  const grader = new StrictGrader()
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
      .then(async (tests) => {
        const result = await runner.run(tests)

        Promise.resolve(result)
          .then(formatter.format)
          .then(writer.log)

        return grader.grade(tests, result)
      })
      .then((success) => success ? RETURN_CODES.OK : RETURN_CODES.FAIL)
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
        return RETURN_CODES.UNEXPECTED_FAIL
      })
}
