import { Router } from 'express';
import { login } from '../controladores/loginCtrl.js';

const router = Router();

// Login
router.post('/login', login);

export default router;