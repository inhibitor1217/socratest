import {
  flow,
  includes,
  values,
} from 'lodash/fp'

interface Extension<T extends string> {
  readonly value: T
  is(value: T): boolean
  toString(): string
}

interface ExtensionStatic<T extends string> {
  includes(value: string): value is T
  parse(value: string): Extension<T>
}

export default function extend<T extends string>(
  name: string,
  Enum: Record<string, string>,
): (new (value: T) => Extension<T>) & ExtensionStatic<T> {
  return class Extension {
    readonly value: T

    constructor(value: T) {
      this.value = value

      Object.freeze(this)
    }

    is(value: T): boolean {
      return this.value === value
    }
  
    toString(): string {
      return this.value.toString()
    }
  
    static includes(value: string): value is T {
      return flow(values, includes)(Enum)(value)
    }
  
    static parse(value: string): Extension {
      if (!Extension.includes(value)) {
        throw new TypeError(`${value} is an invalid value for ${name}`)
      }
  
      return new Extension(value)
    }
  }
}
