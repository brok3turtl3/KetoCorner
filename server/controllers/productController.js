import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//ENDPOINT  GET api/products
//PURPOSE   Retrieve all products
//ACCESS    Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

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
});

//ENDPOINT  DELETE api/products/:id
//PURPOSE   Delete a product by Id
//ACCESS    Private / Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.status(200).send({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

//ENDPOINT  POST api/products
//PURPOSE   Create a new product
//ACCESS    Private / Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = await Product.create({
		user: req.user._id,
		name: 'Sample Product',
		image: '/images/alexa.jpg',
		brand: 'Sample brand',
		category: 'Sample Category',
		description: 'Sample Description',
		price: 0,
		countInStock: 0,
	});

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Error creating product');
	}
});

//ENDPOINT  PUT api/products/:id
//PURPOSE   Update a product
//ACCESS    Private / Admin
const updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		(product.name = req.body.name),
			(product.image = req.body.image),
			(product.brand = req.body.brand),
			(product.category = req.body.category),
			(product.description = req.body.description),
			(product.price = req.body.price),
			(product.countInStock = req.body.countInStock);

		const newProductInfo = await product.save();
		res.json(newProductInfo);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
};
