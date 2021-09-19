import autobind from 'autobind-decorator'
import _ from 'lodash'
import {
  find,
  flow,
  get,
  identity,
  isFunction,
} from 'lodash/fp'
import { resolve } from 'path'
import type { SocratestTestTarget } from '../../../config'
import { compose } from '../../../util/pipe'

@autobind
export default class JsNativeTargetResolver {
  resolve(target: SocratestTestTarget): Promise<any> {
    return Promise.all([
      this.resolveDefaultExport(target).catch(identity),
      this.resolveNamedExport(target).catch(identity),
    ])
      .then(find(isFunction))
  }

  private resolveDefaultExport(target: SocratestTestTarget): Promise<any> {
    return Promise.resolve(target.function)
      .then(this.resolveToAbsolutePath)
      .then(this.jsNativeImport)
      .then(this.resolveJsNativeModule)
      .then((module) => Promise.resolve(module).then(get('default')))
  }

  private resolveNamedExport(target: SocratestTestTarget): Promise<any> {
    return Promise.resolve(target.function)
      .then(this.splitNamedExport)
      .then(compose({
        module: flow(
          get('path'),
          this.resolveToAbsolutePath,
          this.jsNativeImport,
        ),
        moduleName: get('name'),
      }))
      .then(compose({
        module: this.resolveJsNativeModule,
        moduleName: get('moduleName'),
      }))
      .then(({ module, moduleName }: any) => Promise.resolve(module).then(get(moduleName)))
  }

  private splitNamedExport(absolutePath: string): { path: string, name: string } {
    const [last, ...rest] = absolutePath.split('/').reverse()
    const [moduleName, ...fileName] = last.split('.').reverse()
    return {
      path: [fileName.join('.'), ...rest].reverse().join('/'),
      name: moduleName,
    }
  }

  private resolveToAbsolutePath = (relativePath: string) => resolve(process.cwd(), relativePath)

  private jsNativeImport = (path: string) => import(path)

  private resolveJsNativeModule = (module: any) => _.get(module, 'default') ?? _.get(module, 'module')
}
