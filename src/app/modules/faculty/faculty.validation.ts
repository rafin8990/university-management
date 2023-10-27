import { z } from 'zod';

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({}).optional(),
      middleName: z.string({}).optional(),
      lastName: z.string({}).optional(),
    }),
    dateOfBirth: z.string({}).optional(),
    gender: z.enum(['male', 'female'], {}).optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {})
      .optional(),
    email: z.string({}).optional(),
    contactNo: z.string({}).optional(),
    emergencyContactNo: z.string({}).optional(),
    presentAddress: z.string({}).optional(),
    permanentAddress: z.string({}).optional(),
    profileImage: z.string({}).optional(),
    designation: z.string({}).optional(),
  }),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
