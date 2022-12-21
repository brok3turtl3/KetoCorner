import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	profilePic: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	lastVisit: {
		type: Date,
		default: Date.now,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', userSchema);

export default User;
