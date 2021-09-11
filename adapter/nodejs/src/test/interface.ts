export interface SocratestTestCaseMeta {
  version: number
}

export interface SocratestTestCase {
  id: string
  name: string
  description: string
  meta: SocratestTestCaseMeta
}

export interface SocratestTestMeta {
  version: number
}

export interface SocratestTest {
  id: string
  name: string
  description: string
  tags: string[]
  cases: SocratestTestCase[]
  meta: SocratestTestMeta
}

export interface SocratestTestRepository {

}
