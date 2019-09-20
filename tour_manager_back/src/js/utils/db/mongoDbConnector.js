import mongoose from 'mongoose';

export const connectDb = () => {
    return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};