import runner from 'node-pg-migrate'
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers'

import { getConfig, getConfigNumber } from '../src/core/config'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const getDatabase = async (): Promise<StartedTestContainer> => {
  const image = await GenericContainer.fromDockerfile('database').build()

  const pgContainer = await image
    .withExposedPorts(5432)
    .withEnv('POSTGRES_PASSWORD', 'postgres')
    .withWaitStrategy(Wait.forLogMessage(/.*init process complete; ready for start up.*/))
    .start()

  // Wait to ensure Postgres has executed the initialization scripts (there
  // is no waiting for multiple log messages in testcontainers-node, so sleep)
  await sleep(2000)

  process.env.PG_PORT = pgContainer.getMappedPort(5432).toString()
  process.env.PG_HOST = pgContainer.getHost()

  await runner({
    databaseUrl: {
      user: getConfig('PG_USER_MIGRATIONS'),
      password: getConfig('PG_PASSWORD_MIGRATIONS'),
      host: getConfig('PG_HOST'),
      port: getConfigNumber('PG_PORT'),
      database: getConfig('PG_DATABASE'),
    },
    migrationsTable: 'migrations',
    direction: 'up',
    dir: 'migrations',
    count: 1000,
    log: () => {
      return
    },
  })

  return pgContainer
}

const startTestContainer = async (): Promise<void> => {
  global.__TESTCONTAINERS__ = {
    postgres: await getDatabase(),
  }
}

module.exports = startTestContainer
export default startTestContainer
