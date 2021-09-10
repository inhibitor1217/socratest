import { ArgumentParser } from 'argparse'
import { merge } from 'lodash'
import { defaultSocratestOptions } from './const'
import type { SocratestOptions, SocratestOptionsRepository } from './interface'

export default class CommandLineOptionsRepository implements SocratestOptionsRepository {
  private readonly parser: ArgumentParser

  private readonly cmdArgs: any
  
  constructor(argv: string[]) {
    this.parser = new ArgumentParser({
      description: 'A node.js adapter for Socratest.',
    })

    this.setupArguments()

    this.cmdArgs = this.parser.parse_args(argv.slice(2))
  }

  private setupArguments(): void {
    this.parser.add_argument('-c', '--config', { help: 'specify configuration file. default is .socratestrc.json.' })
  }

  get options(): SocratestOptions {
    return merge(defaultSocratestOptions, this.cmdArgs)
  }
}
