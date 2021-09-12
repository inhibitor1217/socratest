import type { Writer } from './interface'

export default class ConsoleWriter implements Writer {
  log(str: string): Promise<void> {
    return Promise.resolve(console.log(str))
  }

  warn(str: string): Promise<void> {
    return Promise.resolve(console.warn(str))
  }

  error(str: string): Promise<void> {
    return Promise.resolve(console.error(str))
  }
}
