import * as Rx from 'rxjs'
import CommandLineOptionsRepository from './CommandLineOptionsRepository'
import { DEFAULT_OPTIONS } from './const'

describe('options', () => {
  it('Applies default options', done => {
    Rx.from([
      '/Users/foo/workspace/some/path/nodejs-adapter-nodejs',
      '/snapshot/nodejs/dist/bin/socratest.js',
    ])
      .pipe(CommandLineOptionsRepository.options)
      .subscribe({
        next: options => expect(options).toEqual(DEFAULT_OPTIONS),
        complete: done,
      })
  })

  it('Applies config option (short)', done => {
    Rx.from([
      '/some/path/to/binary',
      '/snapshot/some/path/to/js/file',
      '-c',
      'somefile.js',
    ])
      .pipe(CommandLineOptionsRepository.options)
      .subscribe({
        next: options => expect(options).toEqual({ config: 'somefile.js' }),
        complete: done,
      })
  })

  it('Applies config option (long)', done => {
    Rx.from([
      '/some/path/to/binary',
      '/snapshot/some/path/to/js/file',
      '--config',
      'anotherfilerc.json',
    ])
      .pipe(CommandLineOptionsRepository.options)
      .subscribe({
        next: options => expect(options).toEqual({ config: 'anotherfilerc.json' }),
        complete: done,
      })
  })
})
