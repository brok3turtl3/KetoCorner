import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

import {
	getProducts,
	getProductById,
	deleteProduct,
} from '../controllers/productController.js';

router.get('/', getProducts);

router.get('/:id', getProductById);
router.delete('/:id',protect, admin, deleteProduct )

export default router;
