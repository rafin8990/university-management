import express from 'express';
import { FacultyValidation } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';

const router = express.Router();
router.get('/:id', FacultyController.getSinglefaculty);
router.get('/', FacultyController.getAllFaculties);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty,
);
router.delete('/id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
