import { StatusCode } from '../types/StatusCodes'

export class InvalidMessageContentError extends Error {
  statusCode = StatusCode.BadRequest
}
