import http, { IncomingMessage, ServerResponse } from 'http'
import { wrapRequest } from './helpers/wrap-request'
import { wrapResponse } from './helpers/wrap-response'
import { createListener } from './listener'
import { Handlers } from './types/Handlers'
import { Options } from './types/Options'
import { StatusCode } from './types/StatusCodes'

export function createServer(handlers: Handlers, options?: Options) {
  const listener = createListener(handlers, options)

  return http.createServer(async (im: IncomingMessage, sr: ServerResponse) => {
    try {
      const req = await wrapRequest(im)
      const res = wrapResponse(sr)

      return listener(req, res)
    } catch (err) {
      if (err.statusCode) {
        sr.writeHead(err.statusCode, err.message)
        return sr.end()
      }

      sr.writeHead(
        StatusCode.InternalServerError,
        err.message || 'Internal server error'
      )
      sr.end()
    }
  })
}
