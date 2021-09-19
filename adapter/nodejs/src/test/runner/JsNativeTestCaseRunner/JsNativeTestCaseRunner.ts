import autobind from 'autobind-decorator'
import _ from 'lodash'
import { get, identity } from 'lodash/fp'
import type {
  SocratestConfig,
  SocratestTestTarget,
} from '../../../config'
import { compose } from '../../../util/pipe'
import type { SocratestTestCase } from '../../model'
import type {
  SocratestTestCaseRunner,
  SocratestTestCaseResult,
} from '../interface'
import { SimpleTestCaseFileReader } from '../util/TestCaseFileReader'
import type { TestCaseFileReader } from '../util/TestCaseFileReader'
import JsNativeTargetResolver from './JsNativeTargetResolver'
import JsNativeTestCaseSerializer from './JsNativeTestCaseSerializer'

@autobind
export default class JsNativeTestCaseRunner implements SocratestTestCaseRunner {
  readonly config: SocratestConfig
  
  private readonly targetResolver: JsNativeTargetResolver
  private readonly fileReader: TestCaseFileReader
  private readonly serializer: JsNativeTestCaseSerializer

  constructor(
    config: SocratestConfig,
    depends?: {
      targetResolver?: JsNativeTargetResolver
      fileReader?: TestCaseFileReader
      serializer?: JsNativeTestCaseSerializer
    },
  ) {
    this.config = config

    this.targetResolver = depends?.targetResolver ?? new JsNativeTargetResolver()
    this.fileReader = depends?.fileReader ?? new SimpleTestCaseFileReader()
    this.serializer = depends?.serializer ?? new JsNativeTestCaseSerializer()
  }
  
  run(
    target: SocratestTestTarget,
    testcase: SocratestTestCase,
  ): Promise<SocratestTestCaseResult> {
    return Promise.resolve(target)
      .then(this.targetResolver.resolve)
      .then(compose({
        fn: identity,
        input: this.fileReader.input(this.config, testcase)
          .then(this.serializer.parse),
        output: this.fileReader.output(this.config, testcase)
          .then(this.serializer.parse),
      }))
      .then(compose({
        fn: get('fn'),
        input: get('input'),
        output: get('output'),
        result: ({ fn, input }: any) => this.runFunction(fn, input),
      }))
      .then(({ output, result }) => ({
        id: testcase.id,
        name: testcase.name,
        result: this.compareResult(result, output),
      }))
  }

  private runFunction(
    fn: any,
    input: any[],
  ): Promise<any> {
    return Promise.resolve(fn(...input))
  }

  private compareResult(
    output: any,
    expectedOutput: any,
  ) {
    return _.isEqual([output], expectedOutput)
  }
}
