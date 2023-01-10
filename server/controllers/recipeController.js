import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';

//ENDPOINT  GET api/recipes
//PURPOSE   Retrieve all recipes
//ACCESS    Public
const getRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find({});
	res.json(recipes);
});

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
});

//ENDPOINT  POST api/recipes
//PURPOSE   Create a new recipe
//ACCESS    Private / Admin
const createRecipe = asyncHandler(async (req, res) => {
	const recipe = await Recipe.create({
		user: req.user._id,
		name: 'Sample Recipe',
		image: '/images/bigmac.jpg',
		type: 'Sample type',
		description: 'Sample Description',
		totalTime: 0,
		prepTime: 0,
		cookTime: 0,
		totalCals: 0,
		fat: 0,
		protein: 0,
		carbs: 0,
		servings: 0,
		directions: ['Sample Direction #1'],
		ingredients: ['Sample Ingredient #1'],
		
	});

	if (recipe) {
		res.json(recipe);
	} else {
		res.status(404);
		throw new Error('Error creating product');
	}
});

export { getRecipes, getRecipeById, createRecipe };
