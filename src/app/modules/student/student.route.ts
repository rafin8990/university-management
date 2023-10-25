import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

// router.patch(
//   '/create-student',
//   validateRequest(userValidation.createUserZodSchema),
//   userController.createStudent,
// );

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);
router.delete('/id', StudentController.deleteStudent);
export const StudentRoutes = router;
