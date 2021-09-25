import SocratestTestCases from './SocratestTestCases'
import type { SocratestTestCaseDto } from './SocratestTestCase'

export interface SocratestTestMetaDto {
  version: number
}

export interface SocratestTestMeta extends Readonly<SocratestTestMetaDto> {}

export interface SocratestTestDto {
  id: string
  name: string
  description: string
  tags: string[]
  meta: SocratestTestMetaDto
  cases: SocratestTestCaseDto[]
}

export default class SocratestTest {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly tags: string[]
  readonly meta: SocratestTestMeta
  readonly cases: SocratestTestCases

  constructor(dto: SocratestTestDto) {
    const {
      id,
      name,
      description,
      tags,
      meta,
      cases,
    } = dto

    this.id = id
    this.name = name
    this.description = description
    this.tags = tags
    this.meta = meta
    this.cases = new SocratestTestCases({ items: cases })
  }
}
