export default function debug(fn: Function): Function {
  return (v: any) => {
    console.log('params:', v)
    const ret = fn(v)
    console.log('returns:', ret)
    return ret
  }
}
