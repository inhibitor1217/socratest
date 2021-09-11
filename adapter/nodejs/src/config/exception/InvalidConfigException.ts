import { BaseException } from '../../util/exception'

export default class InvalidConfigException extends BaseException {
  constructor(
    field: string,
    reason: string,
  ) {
    super({
      name: 'InvalidConfigException',
      message: `
  "${field}" field from given configuration does not match constraint: ${reason}`,
    })
  }
}
