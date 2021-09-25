export interface BaseExceptionOptions {
  name: string
  message: string
  returnCode?: number
}

export default class BaseException extends Error {
  returnCode: number

  constructor({
    name,
    message,
    returnCode,
  }: BaseExceptionOptions) {
    super()

    this.name = name
    this.message = message
    this.returnCode = returnCode ?? 1
  }

  appendMessage(message: string): this {
    this.message += `\n  ${message}`
    return this
  }
}
