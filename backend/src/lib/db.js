import mongoose from "mongoose";

 export const connectDB = async () => {
  try {
    const conn=await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("DB connection error:", error);
    process.exit(1); //1 means failure
  }
};

export default connectDB;