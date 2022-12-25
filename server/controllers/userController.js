import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/GenerateToken.js';

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
	}else{
    res.status(400)
    throw new Error('Invalid user data')
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
	if (req.user) {
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

export { authUser, getUserProfile, registerUser };
