export default function debug(fn: (...args: any[]) => any): (...args: any[]) => any {
  return (v: any) => {
    console.log('params:', v)
    const ret = fn(v)
    console.log('returns:', ret)
    return ret
  }
}
