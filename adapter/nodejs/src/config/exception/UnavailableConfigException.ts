import { BaseException } from '../../util/exception'

export default class UnavailableConfigException extends BaseException {
  constructor(nativeError: Error) {
    super({
      name: 'UnavailableConfigException',
      message: nativeError.message,
    })
  }
}
