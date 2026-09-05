import { Router } from 'express';
import layananRoute from './layanan.route.js';
import paketRoute from './paket.route.js';
import orderanRoute from './orderan.route.js';
import authRoute from './auth.route.js';

const router = Router();

router.use('/auth', authRoute);
router.use('/layanan', layananRoute);
router.use('/paket', paketRoute);
router.use('/orderan', orderanRoute);

export default router;
