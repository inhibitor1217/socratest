import { BaseError } from '../../util/error'

export default class TestCaseParseError extends BaseError {
  constructor(reason: string) {
    super({
      name: 'TestCaseParseError',
      message: `Invalid test case content: ${reason}`,
    })
  }
}
