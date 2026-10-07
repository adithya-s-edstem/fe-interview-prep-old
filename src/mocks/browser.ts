import { setupWorker } from 'msw/browser'
import { browserHandlers } from './browserHandlers'

export const worker = setupWorker(...browserHandlers)
