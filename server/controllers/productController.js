import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


//ENDPOINT  GET api/products
//PURPOSE   Retrieve all products
//ACCESS    Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
})

//ENDPOINT  GET api/products/:id
//PURPOSE   Retrieve product by Id
//ACCESS    Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

		if (product) {
			res.json(product);
		} else {
			res.status(404);
			throw new Error('Product not found');
		}
})

//ENDPOINT  DELETE api/products/:id
//PURPOSE   Delete a product by Id
//ACCESS    Private / Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

	if(product){
	await product.remove()
	res.status(200).send({message: 'Product removed'})
	}else{
		res.status(404)
		throw new Error('Product not found')
	}
		
})

export {
  getProducts,
  getProductById,
	deleteProduct
}