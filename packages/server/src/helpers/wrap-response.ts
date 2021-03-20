import { ServerResponse } from 'http'
import { Response } from '../types/Response'
import { StatusCode } from '../types/StatusCodes'

function getJson(res: ServerResponse) {
  return (data: any) => {
    res.writeHead(StatusCode.Accepted)
    res.write(JSON.stringify(data))
    res.end()
  }
}

export function wrapResponse(res: ServerResponse): Response {
  const json = getJson(res)

  ;(res as Response).json = json
  return res as Response
}
