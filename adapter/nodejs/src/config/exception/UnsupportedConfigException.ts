import { BaseException } from '../../util/exception'

export default class UnsupportedConfigException extends BaseException {
  constructor(message?: string) {
    super({
      name: 'UnsupportedConfigException',
      message: message ?? 'Given configuration is not suported',
    })
  }
}
