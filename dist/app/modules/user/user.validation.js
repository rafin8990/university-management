"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        studesnt: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name Is Required',
                }),
                middleName: zod_1.z.string({}).optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name Is Required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'date of birth is required',
            }),
            gender: zod_1.z.enum(['male', 'female'], {
                required_error: 'gender is required',
            }),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
                required_error: 'blood group is required',
            })
                .optional(),
            email: zod_1.z.string({
                required_error: 'Email is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'emergencyContactNo is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'presentAddress is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'permanentAddress is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father Name is required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'father Occupation is required',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'father Contact No is required',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother Name is required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother Occupation is required',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother Contact No is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Address No is required',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'local guardian Name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'local guardian Occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'local guardian Contact No is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Address No is required',
                }),
            }),
            profileImage: zod_1.z.string({}).optional(),
        }),
    }),
});
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name Is Required',
                }),
                middleName: zod_1.z.string({}).optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name Is Required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'date of birth is required',
            }),
            gender: zod_1.z.enum(['male', 'female'], {
                required_error: 'gender is required',
            }),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
                required_error: 'blood group is required',
            })
                .optional(),
            email: zod_1.z.string({
                required_error: 'Email is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'emergencyContactNo is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'presentAddress is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'permanentAddress is required',
            }),
            designation: zod_1.z.string({
                required_error: 'designation is required',
            }),
            profileImage: zod_1.z.string({}).optional(),
        }),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name Is Required',
                }),
                middleName: zod_1.z.string({}).optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name Is Required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'date of birth is required',
            }),
            gender: zod_1.z.enum(['male', 'female'], {
                required_error: 'gender is required',
            }),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
                required_error: 'blood group is required',
            })
                .optional(),
            email: zod_1.z.string({
                required_error: 'Email is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'emergencyContactNo is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'presentAddress is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'permanentAddress is required',
            }),
            designation: zod_1.z.string({
                required_error: 'designation is required',
            }),
            profileImage: zod_1.z.string({}).optional(),
        }),
    }),
});
exports.userValidation = {
    createStudentZodSchema,
    createFacultyZodSchema,
    createAdminZodSchema,
};
