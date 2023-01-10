import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

import {
	getRecipes,
	getRecipeById,
	createRecipe
} from '../controllers/recipeController.js';

router.get('/', getRecipes);
router.post('/', protect, admin, createRecipe)

router.get('/:id', getRecipeById);

export default router;