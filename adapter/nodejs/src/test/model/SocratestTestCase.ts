export interface SocratestTestCaseMetaDto {
  version: number
}

export interface SocratestTestCaseMeta extends Readonly<SocratestTestCaseMetaDto> {}

export interface SocratestTestCaseDto {
  id: string
  name: string
  description: string
  inputFile: string
  outputFile: string
  meta: SocratestTestCaseMetaDto
}

export default class SocratestTestCase {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly inputFileName: string
  readonly outputFileName: string
  readonly meta: SocratestTestCaseMeta

  constructor(dto: SocratestTestCaseDto) {
    const {
      id,
      name,
      description,
      inputFile,
      outputFile,
      meta,
    } = dto

    this.id = id
    this.name = name
    this.description = description
    this.inputFileName = inputFile
    this.outputFileName = outputFile
    this.meta = meta
  }
}
