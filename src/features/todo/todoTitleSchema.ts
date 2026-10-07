import { z } from 'zod'
import { trimSpacesAndInvisibleCharacters } from './trimSpacesAndInvisibleCharacters'

export const todoTitleSchema = z.string().overwrite(trimSpacesAndInvisibleCharacters).min(1, "Title can't be empty")
