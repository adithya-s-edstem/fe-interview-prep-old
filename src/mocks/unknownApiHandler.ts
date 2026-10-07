import { http, HttpResponse } from 'msw'

export const unknownApiHandler = http.all('/api/*', ({ request }) =>
  HttpResponse.json(
    { message: `No mock handles ${request.method} ${new URL(request.url).pathname}` },
    { status: 404 },
  ),
)
