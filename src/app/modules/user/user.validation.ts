import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    studesnt: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name Is Required',
        }),
        middleName: z.string({}).optional(),
        lastName: z.string({
          required_error: 'Last Name Is Required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          required_error: 'blood group is required',
        })
        .optional(),
      email: z.string({
        required_error: 'Email is required',
      }),
      contactNo: z.string({
        required_error: 'Contact is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergencyContactNo is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'father Occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'father Contact No is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother Contact No is required',
        }),
        address: z.string({
          required_error: 'Address No is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'local guardian Name is required',
        }),
        occupation: z.string({
          required_error: 'local guardian Occupation is required',
        }),
        contactNo: z.string({
          required_error: 'local guardian Contact No is required',
        }),
        address: z.string({
          required_error: 'Address No is required',
        }),
      }),
      profileImage: z.string({}).optional(),
      // academicFaculty: z.string({
      //   required_error: 'Academic Faculty is required',
      // }),
      // academicDepartment: z.string({
      //   required_error: 'Academic Department is required',
      // }),
      // academicSemester: z.string({
      //   required_error: 'Academic Semester is required',
      // }),
    }),
  }),
});

export const userValidation = {
  createUserZodSchema,
};
