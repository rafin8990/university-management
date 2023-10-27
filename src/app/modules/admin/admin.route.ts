import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = express.Router();
router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmins);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin,
);
router.delete('/id', AdminController.deleteAdmin);

export const AdminRoutes = router;
