import type { Result } from './types/Result'

const getPreparedFetch = (url: string, fetch: typeof global.fetch) => (
  operation: string
) => (payload: any = {}) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      operation,
      payload
    })
  })
    .then((response) => (response.ok ? response : Promise.reject(response)))
    .then((response) => response.json())
    .then(data => data.ok ? data : Promise.reject(data))

type Fetchers = {
  [k: string]: <TResult = any>(data?: any) => Promise<Result<TResult>>
}

export default function (fetch: typeof global.fetch, version: string) {
  return async (url: string): Promise<Fetchers> => {
    const sendRequest = getPreparedFetch(url, fetch)
    const handshake = await sendRequest('handshake')({})

    const { protocol, version: serverVersion } = handshake.data

    if (protocol !== 'lrpc') {
      throw new Error(`Unsupported protocol: ${protocol}`)
    }

    if (version !== serverVersion) {
      throw new Error(
        `Server version (${serverVersion}) does not match client version ${version}`
      )
    }

    return new Proxy(
      {},
      {
        get: (target, operation: string) => {
          const TARGET_PROPERTIES = ['then']

          if (operation in target || TARGET_PROPERTIES.includes(operation)) {
            return (target as any)[operation]
          }

          return sendRequest(operation)
        }
      }
    )
  }
}
