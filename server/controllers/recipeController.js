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

//ENDPOINT  PUT api/recipes/:id
//PURPOSE   Update a recipe
//ACCESS    Private / Admin
const updateRecipe = asyncHandler(async (req, res) => {
	const recipe = await Recipe.findById(req.params.id);

	if (recipe) {
		(recipe.name = req.body.name),
			(recipe.image = req.body.image),
			(recipe.type = req.body.type),
			(recipe.description = req.body.description),
			(recipe.totalTime = req.body.totalTime),
			(recipe.prepTime = req.body.prepTime),
			(recipe.cookTime = req.body.cookTime),
			(recipe.totalCals = req.body.totalCals),
			(recipe.fat = req.body.fat),
			(recipe.protein = req.body.protein),
			(recipe.carbs = req.body.carbs),
			(recipe.servings = req.body.servings),
			(recipe.directions = req.body.directions),
			(recipe.ingredients = req.body.ingredients);

		const newRecipeInfo = await recipe.save();
		res.json(newRecipeInfo);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

//ENDPOINT  POST api/recipes/:id/reviews
//PURPOSE   Create a new review
//ACCESS    Private
const createRecipeReview = asyncHandler(async (req, res) => {

	const { rating, comment } = req.body

	const recipe = await Recipe.findById(req.params.id);

	if (recipe) {
		const alreadyReviewed = recipe.reviews.find( review => review.user.toString() === req.user._id.toString())

		if(alreadyReviewed){
			res.status(400)
			throw new Error ('Recipe already reviewed')
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id
		}

		recipe.reviews.push(review)
		recipe.numReviews = recipe.reviews.length
		recipe.rating = recipe.reviews.reduce((acc, item) => item.rating + acc, 0) / recipe.numReviews



		await recipe.save();
		res.status(201).json({message: 'Review added'})
		
	} else {
		res.status(404);
		throw new Error('Recipe not found');
	}
});

export { getRecipes, getRecipeById, createRecipe, updateRecipe, createRecipeReview };
