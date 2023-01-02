import express from 'express';

const router = express.Router();

import {
	getRecipes,
	getRecipeById,
} from '../controllers/recipeController.js';

router.get('/', getRecipes);

router.get('/:id', getRecipeById);

export default router;