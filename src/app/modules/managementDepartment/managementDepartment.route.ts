import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementValidation } from './managementDepartment.validation';
import { ManagementController } from './managementDepartment.controller';
const router = express.Router();

router.post(
  '/create-management',
  validateRequest(ManagementValidation.createManagementZodSchema),
  ManagementController.createManagement,
);

router.get('/:id', ManagementController.getSingleManagement);

router.patch(
  '/:id',
  validateRequest(ManagementValidation.updateManagementZodSchema),
  ManagementController.updateManagement,
);

router.delete('/:id', ManagementController.deleteManagement);

router.get('/', ManagementController.getAllManagements);

export const ManagementRoutes = router;
