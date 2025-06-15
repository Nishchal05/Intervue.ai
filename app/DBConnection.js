import mongoose from "mongoose";
const dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URL);
}
export default dbconnect;