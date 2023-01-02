import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';

router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/', registerUser);

export default router;
