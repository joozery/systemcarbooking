import express from 'express';
import { 
  getAllStaff, 
  createStaff, 
  updateStaff, 
  deleteStaff,
  loginStaff 
} from '../controllers/staffController';

const router = express.Router();

// Public route
router.post('/login', loginStaff);

// Protected routes (we will add auth middleware later)
router.route('/')
  .get(getAllStaff)
  .post(createStaff);

router.route('/:id')
  .put(updateStaff)
  .delete(deleteStaff);

export default router;
