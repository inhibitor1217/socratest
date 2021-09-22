import { ArgumentParser } from 'argparse'
import {
  concat,
  flow,
  merge,
} from 'lodash/fp'
import * as Rx from 'rxjs'
import { DEFAULT_OPTIONS } from './const'
import type {
  SocratestOptions,
  SocratestOptionsRepository,
} from './interface'

namespace ArgParseAdapter {
  interface ArgParseOption {
    short: string
    long: string
    help: string
  }

  const CMD_LINE_OPTIONS: Record<string, ArgParseOption> = {
    CONFIG: {
      short: '-c',
      long: '--config',
      help: `specify configuration file. default is ${DEFAULT_OPTIONS.config}`,
    }
  }

  const attachParserOption =
    ({ short, long, help }: ArgParseOption) =>
    (parser: ArgumentParser): ArgumentParser => {
      parser.add_argument(short, long, { help })
      return parser
    }

  const parser = (): ArgumentParser => {
    const parser = new ArgumentParser({ description: 'A node.js adapter for Socratest.' })
    return flow(
      attachParserOption(CMD_LINE_OPTIONS.CONFIG),
    )(parser)
  }

  export const parseArguments = (args: string[]) => parser().parse_args(args)
}

namespace CommandLineOptionsRepository {
  export const options: SocratestOptionsRepository['options'] = Rx.pipe(
    Rx.skip(2),
    Rx.reduce<string, string[]>(concat, []),
    Rx.map( ArgParseAdapter.parseArguments ),
    Rx.map<any, SocratestOptions>(merge(DEFAULT_OPTIONS) ),
  )
}

export default CommandLineOptionsRepository
