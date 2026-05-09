import express from 'express';
import { registerPartner, getPartners, updatePartnerStatus, loginPartner } from '../controllers/partnerController';

const router = express.Router();

// Public routes
router.post('/register', registerPartner);
router.post('/login', loginPartner);

// Admin route to get all partners
router.get('/', getPartners);

// Admin route to update partner status
router.put('/:id/status', updatePartnerStatus);

export default router;
