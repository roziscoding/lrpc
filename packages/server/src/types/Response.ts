import { ServerResponse } from 'node:http'

export type Response = ServerResponse & {
  json: (data: any) => void
}