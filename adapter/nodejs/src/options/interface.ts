import type {
  Observable,
  UnaryFunction,
} from 'rxjs'

export interface SocratestOptions {
  config: string
}

export interface SocratestOptionsRepository {
  options: UnaryFunction<Observable<string>, Observable<SocratestOptions>>
}
