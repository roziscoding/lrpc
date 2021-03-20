import { StatusCode } from '../types/StatusCodes'

export class MethodNotAllowedError extends Error {
  statusCode = StatusCode.MethodNotAllowed

  constructor(method: string) {
    super(`Method ${method} not allowed. Use POST`)
  }
}
