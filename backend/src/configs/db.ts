import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error('MONGODB_URI chưa được khai báo trong file .env');
        }

        const conn = await mongoose.connect(mongoURI);

        console.log(`\x1b[32m[Database] Kết nối thành công tới: ${conn.connection.host}\x1b[0m`);
    } catch (error) {
        console.error(`\x1b[31m[Database] Lỗi kết nối: ${(error as Error).message}\x1b[0m`);
        process.exit(1);
    }
};

export default connectDB;
