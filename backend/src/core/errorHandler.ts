process.on('uncaughtException', (err: unknown) => {
  // eslint-disable-next-line no-console
  console.log({ err }, 'Uncaught exception, crashing and restarting')
  process.exit(1)
})

process.on('unhandledRejection', (reason: unknown, promise: unknown) => {
  // eslint-disable-next-line no-console
  console.log({ err: reason }, 'Unhandled Promise rejection', promise)
  process.exit(1)
})
