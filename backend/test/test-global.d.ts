import type { StartedTestContainer } from 'testcontainers'

declare global {
  // eslint-disable-next-line no-var
  var __TESTCONTAINERS__: {
    postgres: StartedTestContainer
  }
}
