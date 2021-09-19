import autobind from 'autobind-decorator'
import { get } from 'lodash/fp'
import { resolve } from 'path'
import type { SocratestTestTarget } from '../../../config'

@autobind
export default class JsNativeTargetResolver {
  resolve(target: SocratestTestTarget): Promise<any> {
    return this.resolveDefaultExport(target)
  }

  private resolveDefaultExport(target: SocratestTestTarget): Promise<any> {
    return Promise.resolve(target.function)
      .then((fnPath) => import(resolve(process.cwd(), fnPath)))
      .then(get('default'))
  }
}
