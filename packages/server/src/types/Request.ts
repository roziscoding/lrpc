import { IncomingMessage } from 'http'

export type Request = IncomingMessage & {
  body: {
    operation: string
    payload: any
  }
}

