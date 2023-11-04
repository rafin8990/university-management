"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyValidation = void 0;
const zod_1 = require("zod");
const updateFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({}).optional(),
            middleName: zod_1.z.string({}).optional(),
            lastName: zod_1.z.string({}).optional(),
        }),
        dateOfBirth: zod_1.z.string({}).optional(),
        gender: zod_1.z.enum(['male', 'female'], {}).optional(),
        bloodGroup: zod_1.z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {})
            .optional(),
        email: zod_1.z.string({}).optional(),
        contactNo: zod_1.z.string({}).optional(),
        emergencyContactNo: zod_1.z.string({}).optional(),
        presentAddress: zod_1.z.string({}).optional(),
        permanentAddress: zod_1.z.string({}).optional(),
        profileImage: zod_1.z.string({}).optional(),
        designation: zod_1.z.string({}).optional(),
    }),
});
exports.FacultyValidation = {
    updateFacultyZodSchema,
};
