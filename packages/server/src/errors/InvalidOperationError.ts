import { StatusCode } from '../types/StatusCodes'

export class InvalidOperationError extends Error {
  statusCode = StatusCode.NotFound

  constructor (operation: string) {
    super(`Operation ${operation} does not exist server-side`)
  }
}