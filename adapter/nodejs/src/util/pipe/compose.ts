import _ from 'lodash'

export default function compose(obj: any): any {
  return (param: any) => {
    if (obj instanceof Promise) {
      return obj.then((resolved) => compose(resolved)(param))
    }
    
    if (typeof obj === 'object') {
      if (_.isArray(obj)) {
        return _.map(obj, (value) => compose(value)(param))
      }

      return _.mapValues(obj, (value) => compose(value)(param))
    }

    if (typeof obj === 'function') {
      return obj(param)
    }

    return obj
  }
}
