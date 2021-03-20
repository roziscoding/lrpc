import { IncomingMessage } from 'http'
import { JsonParseError } from '../errors/JsonParseError'

export function extractBody(req: IncomingMessage) {
  const chunks: Buffer[] = []

  req.on('data', (chunk) => chunks.push(chunk))

  return new Promise<any>((resolve, reject) => {
    req.on('end', () => {
      const rawBody = Buffer.concat(chunks).toString('utf-8')

      try {
        const body = JSON.parse(rawBody)
        resolve(body)
      } catch (err) {
        reject(new JsonParseError(err.message))
      }
    })
  })
}
