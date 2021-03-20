import { IncomingMessage } from 'http'
import { InvalidContentTypeError } from '../errors/InvalidContentTypeError'
import { InvalidMessageContentError } from '../errors/InvalidMessageContentError'
import { MethodNotAllowedError } from '../errors/MethodNotAllowedError'
import { Request } from '../types/Request'
import { extractBody } from './extract-body'

const FORBIDDEN_PAYLOAD_TYPES = [
  'undefined',
  'boolean',
  'string',
  'number',
  'function',
  'xml'
]

function doesOperationHasErrors(operation: any) {
  if (!operation) return 'Operation is required'
  if (typeof operation !== 'string') return 'Operation must be a string'
  return false
}

function doesPayloadHasErrors (payload: any) {
  if (!payload) return 'Payload is required'
  if (FORBIDDEN_PAYLOAD_TYPES.includes(typeof payload)) return 'Payload must be an object'
  return false
}

export async function wrapRequest(req: IncomingMessage): Promise<Request> {
  if (req.method !== 'POST') {
    throw new MethodNotAllowedError(req.method || '')
  }

  if (req.headers['content-type'] !== 'application/json') {
    throw new InvalidContentTypeError()
  }

  const body = await extractBody(req)

  const { operation, payload } = body

  const operationErrors = doesOperationHasErrors(operation)
  const payloadErrors = doesPayloadHasErrors(payload)

  if (operationErrors || payloadErrors) {
    throw new InvalidMessageContentError(operationErrors || payloadErrors || '')
  }

  ;(req as Request).body = body

  return req as Request
}
