import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import recipeRoutes from './routes/recipeRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/recipes', recipeRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve();

if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'staging'
) {
	app.use(express.static('client/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
}


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
