import SocratestTestCase from './SocratestTestCase'
import type { SocratestTestCaseDto } from './SocratestTestCase'

export interface SocratestTestCasesDto {
  items: SocratestTestCaseDto[]
}

export default class SocratestTestCases {
  readonly items: SocratestTestCase[]

  constructor(dto: SocratestTestCasesDto) {
    this.items = dto.items.map((caseDto) => new SocratestTestCase(caseDto))
  }

  get size(): number {
    return this.items.length
  }

  map<ReturnType>(fn: (item: SocratestTestCase) => ReturnType): ReturnType[] {
    return this.items.map(fn)
  }
}
