import type { Question } from './Question'

export const todoQuestion: Question = { number: 1, title: 'Todo App', path: '/todo' }
export const searchQuestion: Question = { number: 2, title: 'Live Search', path: '/search' }
export const registerQuestion: Question = { number: 3, title: 'Registration Wizard', path: '/register' }
export const tableQuestion: Question = { number: 4, title: 'Data Table', path: '/table' }
export const authQuestion: Question = { number: 5, title: 'Login & Session Handling', path: '/auth' }

export const questions = [todoQuestion, searchQuestion, registerQuestion, tableQuestion, authQuestion]
