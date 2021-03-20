export type Result<T> = {
  ok: boolean,
  data: T
}

export type MethodHandler<TPayload = any, TResult = any> = (payload: TPayload) => Result<TResult> | undefined | null

export type Handlers = {
  [method: string]: MethodHandler
}