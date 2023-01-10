import asyncHandler from 'express-async-handler';
import { request } from 'https';
import Order from '../models/orderModel.js';

//ENDPOINT  POST api/orders
//PURPOSE   Create a new order
//ACCESS    Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
		return;
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

//ENDPOINT  GET api/orders/:id
//PURPOSE   Retrieve an order by Id
//ACCESS    Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Prder not found');
	}
});

//ENDPOINT  PUT api/orders/:id/pay
//PURPOSE   Update order to paid
//ACCESS    Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});



//ENDPOINT  GET api/orders/myorders
//PURPOSE   Retrieve logged in user orders
//ACCESS    Private
const getMyOrders = asyncHandler(async (req, res) => {
	
	try {
		const orders = await Order.find({ user: req.user._id });
		
		res.json(orders);
	
	} catch (error) {
		res.status(404);
		throw new Error('No orders found');
	}
});

//ENDPOINT  GET api/orders
//PURPOSE   Retrieve all orders
//ACCESS    Private / Admin
const getOrders = asyncHandler(async (req, res) => {
	
	try {
		const orders = await Order.find({}).populate('user', 'id name');
		
		res.json(orders);
	
	} catch (error) {
		res.status(404);
		throw new Error('No orders found');
	}
});

//ENDPOINT  PUT api/orders/:id/deliver
//PURPOSE   Update order to delivered
//ACCESS    Private / Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();
		
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered };
