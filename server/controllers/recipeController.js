import asyncHandler from 'express-async-handler';
import Recipe from '../models/recipeModel.js';


//ENDPOINT  GET api/recipes
//PURPOSE   Retrieve all recipes
//ACCESS    Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
})

//ENDPOINT  GET api/products/:id
//PURPOSE   Retrieve product by Id
//ACCESS    Public
// const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

// 		if (product) {
// 			res.json(product);
// 		} else {
// 			res.status(404);
// 			throw new Error('Product not found');
// 		}
// })

export {
  getRecipes,
  // getProductById
}