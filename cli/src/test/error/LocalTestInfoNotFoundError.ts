import { BaseError } from '../../util/error'

export default class LocalTestInfoNotFoundError extends BaseError {
  constructor() {
    super({
      name: 'LocalTestNotFoundError',
      message: 'Test info file not found. Check your local test location.'
    })
  }
}
