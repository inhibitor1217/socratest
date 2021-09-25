import autobind from 'autobind-decorator'
import { spawn } from 'child_process'
import type {
  SocratestConfig,
  SocratestTestTarget,
} from '../../../config'
import { Completer } from '../../../util/Completer'
import type {
  SocratestTestCaseRunner,
  SocratestTestCaseResult,
} from '../interface'
import type { SocratestTestCase } from '../../model'
import { SimpleFilePathResolver } from '../util/FilePathResolver'
import type { FilePathResolver } from '../util/FilePathResolver'

@autobind
export default class ProcessTestCaseRunner implements SocratestTestCaseRunner {
  readonly config: SocratestConfig

  private readonly filePathResolver: FilePathResolver

  constructor(config: SocratestConfig) {
    this.config = config

    this.filePathResolver = new SimpleFilePathResolver()
  }
  
  async run(
    target: SocratestTestTarget,
    testcase: SocratestTestCase,
  ): Promise<SocratestTestCaseResult> {
    const { function: fn } = target
    const { id, name, inputFileName, outputFileName } = testcase

    const inputFileAbsolutePath = await this.resolvePath(inputFileName)
    const outputFileAbsolutePath = await this.resolvePath(outputFileName)

    const exec = spawn('[TODO]', [fn, inputFileAbsolutePath])
    const diff = spawn('diff', [outputFileAbsolutePath, '-'])

    exec.stdout.pipe(diff.stdin)

    const completer = new Completer<boolean>()

    diff.on('close', (code) => completer.resolve(code === 0))
    diff.on('error', (e) => completer.reject(e))

    return completer.promise
      .then((result) => ({
        id,
        name,
        result,
      }))
  }

  private resolvePath(path: string): Promise<string> {
    return this.filePathResolver.resolve(this.config, path)
  }
}
