import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB....")
    } catch (error) {
        console.log("Faild to connect to DB: ",error.message);
    }
}

export default connectDb;