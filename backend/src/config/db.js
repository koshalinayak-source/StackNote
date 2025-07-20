import mongoose from "mongoose"


export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    }catch(error){
        console.error("Error connect to mongoDB",error);
        process.exit(1) //exit with failure
    }
};