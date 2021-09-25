import { BaseError } from './error'

class AssertionError extends BaseError {
  constructor(message?: string) {
    super({
      name: 'AssertionError',
      message: message ?? 'assertion failed',
    })
  }
}

export default function assert<T extends boolean>(condition: T, message?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(message)
  }
}
