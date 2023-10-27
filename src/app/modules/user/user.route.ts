import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  userController.createFaculty,
);

export const userRoutes = router;
