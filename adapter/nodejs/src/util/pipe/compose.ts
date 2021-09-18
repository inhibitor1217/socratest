import _ from 'lodash'

export default function compose(obj: any): any {
  return (param: any) => _.mapValues(obj, (value) => {
    if (typeof value === 'object') return compose(value)(param)
    if (typeof value === 'function') return value(param)
    return value
  })
}
