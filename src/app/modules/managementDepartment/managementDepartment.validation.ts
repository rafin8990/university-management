import { z } from 'zod';

const createManagementZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});
const updateManagementZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
  }),
});

export const ManagementValidation = {
  createManagementZodSchema,
  updateManagementZodSchema,
};
