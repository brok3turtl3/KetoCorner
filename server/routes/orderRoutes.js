import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
} from '../controllers/orderController.js';

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);

export default router;
