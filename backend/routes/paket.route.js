import { Router } from 'express';
import { getPaket, getPaketById, createPaket, updatePaket, deletePaket } from '../controllers/paket.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getPaket);
router.get('/:id', getPaketById);

router.use(verifyToken);
router.post('/', createPaket);
router.put('/:id', updatePaket);
router.delete('/:id', deletePaket);

export default router;
