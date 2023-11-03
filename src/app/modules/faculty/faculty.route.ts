import express from 'express';
import { FacultyValidation } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  FacultyController.getSinglefaculty,
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  FacultyController.getAllFaculties,
);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.updateFaculty,
);
router.delete(
  '/id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.deleteFaculty,
);

export const FacultyRoutes = router;
