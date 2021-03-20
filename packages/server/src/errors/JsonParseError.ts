import { StatusCode } from '../types/StatusCodes'

export class JsonParseError extends Error {
  statusCode = StatusCode.BadRequest
}