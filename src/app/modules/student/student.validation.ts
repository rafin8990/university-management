import { z } from 'zod';

const updateStudentZodSchema = z.object({
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
    guardian: z
      .object({
        fatherName: z.string({}).optional(),
        fatherOccupation: z.string({}).optional(),
        fatherContactNo: z.string({}).optional(),
        motherName: z.string({}).optional(),
        motherOccupation: z.string({}).optional(),
        motherContactNo: z.string({}).optional(),
        address: z.string({}).optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string({}).optional(),
        occupation: z.string({}).optional(),
        contactNo: z.string({}).optional(),
        address: z.string({}).optional(),
      })
      .optional(),
    profileImage: z.string({}).optional(),
  }),
});

export const StudentValidation = {
  updateStudentZodSchema,
};
