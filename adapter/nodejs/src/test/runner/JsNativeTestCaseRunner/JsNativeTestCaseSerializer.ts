import autobind from 'autobind-decorator'
import _ from 'lodash'
import {
  filter,
  flow,
  identity,
  split,
} from 'lodash/fp'
import { TestCaseParseError } from '../../error'

@autobind
export default class JsNativeTestCaseSerializer {
  parse(content: string): any[] {
    return flow(
      this.splitContent,
      this.parseParams,
    )(content)
  }

  private splitContent(content: string): string[] {
    return flow(split('\n'), filter(identity))(content)
  }

  private parseParams(content: string[]): any[] {
    if (_.isEmpty(content)) {
      return []
    }

    const [value, type, ...rest] = content

    if (_.isNil(type)) {
      throw new TestCaseParseError('type of input parameter not specified')
    }

    return [this.parseParam(value, type), ...this.parseParams(rest)]
  }

  private parseParam(value: string, type: string): any {
    switch (type) {
      case 'int':
        return Number(value)
      case 'double':
        return Number(value)
      case 'string':
        return value
      default:
        throw new TestCaseParseError(`unsupported input parameter type: ${type}`)
    }
  }
}
