import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//ENDPOINT  POST api/users
//PURPOSE   Register a new user
//ACCESS    Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

//ENDPOINT  POST api/users/login
//PURPOSE   Authenticate User and get token
//ACCESS    Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	console.log(user);

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

//ENDPOINT  GET api/users/profile
//PURPOSE   Get users profile
//ACCESS    Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			isAdmin: req.user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//ENDPOINT  PUT api/users/profile
//PURPOSE   Update users profile
//ACCESS    Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//ENDPOINT  GET api/users
//PURPOSE   Retrieve all users
//ACCESS    Private / Admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

//ENDPOINT  DELETE api/users/:id
//PURPOSE   Delete a user
//ACCESS    Private / Admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: 'User removed' });
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//ENDPOINT  GET api/users/:id
//PURPOSE   Retrieve user by id
//ACCESS    Private / Admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//ENDPOINT  PUT api/users/:id
//PURPOSE   Update user
//ACCESS    Private / Admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin ?? user.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
