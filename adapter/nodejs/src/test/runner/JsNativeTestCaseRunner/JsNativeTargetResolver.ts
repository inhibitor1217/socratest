import autobind from 'autobind-decorator'
import {
  flow,
  get,
} from 'lodash/fp'
import { resolve } from 'path'
import type { SocratestTestTarget } from '../../../config'
import { compose } from '../../../util/pipe'

@autobind
export default class JsNativeTargetResolver {
  resolve(target: SocratestTestTarget): Promise<any> {
    return this.resolveDefaultExport(target)
  }

  private resolveDefaultExport(target: SocratestTestTarget): Promise<any> {
    return Promise.resolve(target.function)
      .then((fnPath) => resolve(process.cwd(), fnPath))
      .then(this.splitNamedExport)
      .then(compose({
        name: get('name'),
        module: flow(get('path'), (path) => import(path)),
      }))
      .then(({ name, module }: any) => Promise.resolve(module)
        .then(get(`default.${name ?? 'default'}`)))
  }

  private splitNamedExport(absolutePath: string): { path: string, name: string } {
    const [last, ...rest] = absolutePath.split('/').reverse()
    const [lastPath, name] = last.split('.')
    return {
      path: [lastPath, ...rest].reverse().join('/'),
      name,
    }
  }
}
