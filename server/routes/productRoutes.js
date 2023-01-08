import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct
} from '../controllers/productController.js';

router.get('/', getProducts);

router.get('/:id', getProductById);
router.delete('/:id',protect, admin, deleteProduct )
router.put('/:id',protect, admin, updateProduct )
router.post('/', protect, admin,  createProduct)

export default router;
