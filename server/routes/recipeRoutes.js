import express from 'express';

const router = express.Router();

import {
	getRecipes,
	// getProductById,
} from '../controllers/recipeController.js';

router.get('/', getRecipes);

// router.get('/:id', getProductById);

export default router;