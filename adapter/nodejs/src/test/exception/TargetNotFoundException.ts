import { BaseException } from '../../util/exception'

export default class TargetNotFoundException extends BaseException {
  constructor(test: string) {
    super({
      name: 'TargetNotFoundException',
      message: `Test with id or name ${test} not found.`
    })
  }
}
