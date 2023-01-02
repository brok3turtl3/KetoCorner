import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
	},
	{ timestamps: true }
);

const recipeSchema = Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},

	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
  totalTime: {
		type: Number,
		required: true,
	},
  prepTime: {
		type: Number,
		required: true,
	},
  cookTime: {
		type: Number,
		required: true,
	},
	totalCals: {
		type: Number,
		required: true,
	},
  fat: {
		type: Number,
		required: true,
	},
  protein: {
		type: Number,
		required: true,
	},
  carbs: {
		type: Number,
		required: true,
	},
  servings: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		default: 0,
	},
	directions: [String],
	ingredients: [String],
	reviews: [reviewSchema],
	price: {
		type: Number,
		required: true,
		default: 0,
	},
	countInStock: {
		type: Number,
		required: true,
		default: 0,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;