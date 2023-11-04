"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const user_route_1 = require("../modules/user/user.route");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const student_route_1 = require("../modules/student/student.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const managementDepartment_route_1 = require("../modules/managementDepartment/managementDepartment.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_routes_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_routes_1.AcademicDepartmentRoutes,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/management-department',
        route: managementDepartment_route_1.ManagementRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.LoginRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
