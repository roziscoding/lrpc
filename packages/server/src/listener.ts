import path from 'path'
import { Handlers, Result } from './types/Handlers'
import { Options } from './types/Options'
import { Request } from './types/Request'
import { Response } from './types/Response'

const packageJson = require(path.join(__dirname, '..', 'package'))

const getHandshake = (userHandlers?: Handlers) => (): Result<{
  protocol: string
  version: string
  operations?: string[]
}> => ({
  ok: true,
  data: {
    protocol: 'lrpc',
    version: packageJson.version,
    operations: Object.keys(userHandlers || {})
  }
})

export function createListener(userHandlers: Handlers, options: Options = {}) {
  return async (req: Request, res: Response) => {
    const { operation, payload } = req.body

    const handlers: Handlers = {
      ...userHandlers,
      handshake: getHandshake(options.noList ? undefined : userHandlers)
    }

    const handler = handlers[operation]

    if (!handler) {
      return res.json({
        ok: false,
        data: {
          error: {
            message: `Operation ${operation} does not exist server-side`
          }
        }
      })
    }

    try {
      const result = await handler(payload)

      const ok = result?.ok ?? true
      const data = result?.data || {}

      return res.json({ ok, data })
    } catch (err) {
      res.json({ ok: false, error: err })
    }
  }
}
