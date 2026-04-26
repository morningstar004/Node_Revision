import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        console.log('MONGODB_URL:', process.env.MONGODB_URL);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`Connected to DB: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;