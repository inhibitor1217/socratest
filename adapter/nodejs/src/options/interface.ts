export interface SocratestOptions {
  config: string
}

export interface SocratestOptionsRepository {
  get options(): SocratestOptions
}
