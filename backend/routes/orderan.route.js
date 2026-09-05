import { Router } from 'express';
import { getOrderan, getOrderanById, createOrderan, updateOrderan, deleteOrderan } from '../controllers/orderan.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getOrderan);
router.get('/:id', getOrderanById);

router.use(verifyToken);
router.post('/', createOrderan);
router.put('/:id', updateOrderan);
router.delete('/:id', deleteOrderan);

export default router;
