import { Router } from 'express';
import { loginAdmin } from '../controllers/auth.controller.js';
import { loginValidation } from '../validations/auth.validation.js';

const router = Router();

router.post('/login', loginValidation, loginAdmin);

export default router;
