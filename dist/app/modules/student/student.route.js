"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = require("./student.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT), student_controller_1.StudentController.getSingleStudent);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT), student_controller_1.StudentController.getAllStudents);
router.patch('/:id', (0, validateRequest_1.default)(student_validation_1.StudentValidation.updateStudentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), student_controller_1.StudentController.updateStudent);
router.delete('/id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), student_controller_1.StudentController.deleteStudent);
exports.StudentRoutes = router;
