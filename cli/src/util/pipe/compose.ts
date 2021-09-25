import _ from 'lodash'

export default function compose(obj: any): any {
  return (param: any) => {
    if (obj instanceof Promise) {
      return obj.then((resolved) => compose(resolved)(param))
    }
    
    if (typeof obj === 'object') {
      if (_.isArray(obj)) {
        return Promise.all( _.map(obj, (item) => compose(item)(param)) )
      }

      return Promise.all(_.entries(obj)
        .map(([key, value]) =>
          compose(value)(param)
            .then((resolved: any) => [key, resolved])))
        .then(_.fromPairs)
    }

    if (typeof obj === 'function') {
      return Promise.resolve(obj(param))
    }

    return Promise.resolve(obj)
  }
}
