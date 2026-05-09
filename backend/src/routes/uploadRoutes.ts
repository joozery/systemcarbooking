import { Router } from 'express';
import { uploadSingle } from '../controllers/uploadController';

const router = Router();

// POST /api/upload
router.post('/', uploadSingle);

export default router;
