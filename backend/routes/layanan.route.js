import { Router } from 'express';
import { getLayanan, getLayananById, createLayanan, updateLayanan, deleteLayanan } from '../controllers/layanan.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getLayanan);
router.get('/:id', getLayananById);

router.use(verifyToken);
router.post('/', createLayanan);
router.put('/:id', updateLayanan);
router.delete('/:id', deleteLayanan);

export default router;
