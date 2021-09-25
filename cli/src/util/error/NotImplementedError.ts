import BaseError from './BaseError'

export default class NotImplementedError extends BaseError {
  constructor() {
    super({
      name: 'NotImplementedError',
      message: 'This feature is not implemented yet.',
    })
  }
}
