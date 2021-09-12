import _ from 'lodash'
import assert from '../assert'

export default function requires<T>(obj: T | null | undefined): T {
  assert(!_.isNil(obj), 'requires assertion failed')
  return obj
}
