import _ from 'lodash'
import { CommandLineOptionsRepository } from './options'

export async function execute(argv: string[]): Promise<number> {
  const args = new CommandLineOptionsRepository(argv).options
  console.log(args.config)

  return 0
}
