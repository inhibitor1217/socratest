import assert from './assert'

export default function unreachable(): never {
  assert(false, 'unreachable code')
}
