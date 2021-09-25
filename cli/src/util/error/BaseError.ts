export interface BaseErrorOptions {
  name: string
  message: string
  returnCode?: number
}

export default class BaseError extends Error {
  returnCode: number

  constructor({
    name,
    message,
    returnCode,
  }: BaseErrorOptions) {
    super()

    this.name = name
    this.message = message
    this.returnCode = returnCode ?? -1
  }
}
