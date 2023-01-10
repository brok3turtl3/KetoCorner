import express from 'express';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered
} from '../controllers/orderController.js';

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getOrders)
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);


router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)
export default router;
