import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';


//ENDPOINT  GET api/recipes
//PURPOSE   Retrieve all recipes
//ACCESS    Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
})

// ENDPOINT  GET api/recipes/:id
// PURPOSE   Retrieve recipe by Id
// ACCESS    Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

		if (recipe) {
			res.json(recipe);
		} else {
			res.status(404);
			throw new Error('Recipe not found');
		}
})

export {
  getRecipes,
  getRecipeById
}