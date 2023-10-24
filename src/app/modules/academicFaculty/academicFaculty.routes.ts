import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicfacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.controller'
const router = express.Router()

router.post(
  '/',
  validateRequest(AcademicfacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty,
)

router.get('/:id', AcademicFacultyController.getSinglefaculty)

router.patch(
  '/id',
  validateRequest(AcademicfacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateFaculty,
)

router.delete('/:id', AcademicFacultyController.deleteFaculty)

export const AcademicFacultyRoutes = router
