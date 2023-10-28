import express from 'express';
const router = express.Router();
router.post('/login');
router.get('/:id');
router.get('/');
router.patch('/:id');
router.delete('/id');

export const LoginRoutes = router;
