import mongoose from 'mongoose';

import dotenv from 'dotenv';



export const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
		console.log(`MongoDB is connect to: ${connection.connection.host}`);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};
