import { handlers } from './handlers'
import { unknownApiHandler } from './unknownApiHandler'

export const browserHandlers = [...handlers, unknownApiHandler]
