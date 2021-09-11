import autobind from 'autobind-decorator'
import _ from 'lodash'
import { InvalidConfigException } from '../exception'
import type {
  SocratestTestTarget,
  SocratestConfig,
  SocratestConfigValidator,
} from '../interface'

@autobind
export default class ConfigSchemaValidator implements SocratestConfigValidator {
  validationPipe(raw: any): SocratestConfig {
    this.validate(raw)
    return raw
  }

  validate(raw: any): asserts raw is SocratestConfig {
    if (_.get(raw, 'platform') !== 'nodejs') {
      throw new InvalidConfigException('platform', 'should be "nodejs"')
    }

    const targets = _.get(raw, 'targets')
    if (!_.isArray(targets)) {
      throw new InvalidConfigException('targets', 'should be array')
    }

    targets.forEach(this.validateTestTarget)
  }

  private validateTestTarget(raw: any): asserts raw is SocratestTestTarget {
    const test = _.get(raw, 'test')
    const fn = _.get(raw, 'function')

    if (!_.isString(test) || _.isEmpty(test)) {
      throw new InvalidConfigException(`targets[].test`, 'should be nonempty string')
    }

    if (!_.isString(fn) || _.isEmpty(fn)) {
      throw new InvalidConfigException(`targets[].function`, 'should be nonempty string')
    }
  }
}
