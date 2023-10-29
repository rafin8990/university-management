import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.LoginZodSchema),
  AuthController.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
);
// router.get('/:id');
// router.get('/');
// router.patch('/:id');
// router.delete('/id');

export const LoginRoutes = router;
