import mongoose from "mongoose";

const connectDB = async (url) => {
 await mongoose.connect(url).then(()=>{
 console.log("Connect DB");
 }).catch((con)=>{
 console.error("Failed to connect to the database!");
 process.exit(1);
 });
 console.log("connected successfully!");
};

export default connectDB;