export class HttpError extends Error {
  readonly status: number

  constructor(url: URL, status: number) {
    super(`Request to ${url.href} failed with status ${String(status)}`)
    this.name = 'HttpError'
    this.status = status
  }
}
