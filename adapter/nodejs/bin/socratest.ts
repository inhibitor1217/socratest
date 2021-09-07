async function main() {
  process.exitCode = await require('../src/index')
    .execute(process.argv)
}

main()
