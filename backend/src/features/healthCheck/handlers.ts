import type { RouteHandler } from 'fastify'
import { PoolClient } from 'pg'

import { HealthCheckRoute } from './schemas'

export const healthCheck: RouteHandler<HealthCheckRoute> = async (req, res) => {
  const client = await req.server.pg.connect()

  try {
    const result = await client.query<{ health: number }>('SELECT 1 AS health')
    return res.send({ ok: result.rows[0]?.health === 1 })
  } catch (_e) {
    return res.send({ ok: false })
  } finally {
    client.release()
  }
}
