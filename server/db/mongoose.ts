import mongoose from 'mongoose';
const connectDb = async (): Promise<void> => {
    await mongoose.connect(process.env.MONGODB_URL as string);

    if (process.env.NODE_ENV === 'development') {
        console.log('Connected to myDB');
    }
};

export default connectDb;
