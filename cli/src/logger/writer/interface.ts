export interface Writer {
  log(str: string): Promise<void>
  warn(str: string): Promise<void>
  error(str: string): Promise<void>
}
