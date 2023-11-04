"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const managementDepartment_validation_1 = require("./managementDepartment.validation");
const managementDepartment_controller_1 = require("./managementDepartment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-management', (0, validateRequest_1.default)(managementDepartment_validation_1.ManagementValidation.createManagementZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), managementDepartment_controller_1.ManagementController.createManagement);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT), managementDepartment_controller_1.ManagementController.getSingleManagement);
router.patch('/:id', (0, validateRequest_1.default)(managementDepartment_validation_1.ManagementValidation.updateManagementZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), managementDepartment_controller_1.ManagementController.updateManagement);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), managementDepartment_controller_1.ManagementController.deleteManagement);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT), managementDepartment_controller_1.ManagementController.getAllManagements);
exports.ManagementRoutes = router;
