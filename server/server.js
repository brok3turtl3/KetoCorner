import express from 'express';
import { connectDB } from './config/db.js';

import products from './data/products.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

connectDB();

app.get('/', (req, res) => {
	res.send('API is RUNNING!');
});

app.get('/api/products/', (req, res) => {
	const product = products;
	res.json(product);
});

app.get('/api/product/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id);

	res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
