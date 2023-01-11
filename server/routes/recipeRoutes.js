import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

import {
	getRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe
} from '../controllers/recipeController.js';

router.get('/', getRecipes);
router.put('/:id', protect, admin, updateRecipe)
router.post('/', protect, admin, createRecipe)

router.get('/:id', getRecipeById);

export default router;