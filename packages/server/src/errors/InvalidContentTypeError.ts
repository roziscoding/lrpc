import { StatusCode } from '../types/StatusCodes'

export class InvalidContentTypeError extends Error {
  statusCode = StatusCode.BadRequest
  
  constructor() {
    super('Content-Type header must be "application/json"')
  }
}
