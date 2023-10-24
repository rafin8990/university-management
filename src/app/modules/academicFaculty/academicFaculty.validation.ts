import { z } from 'zod'

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
})
const updateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
})

export const AcademicfacultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
}
