// import mongoose from "mongoose";
//  const connectDB = async ()=>{
//     try{
//         const result = await mongoose.connect('mongodb+srv://mhussainfullstack_db_user:hussain_job_portal123@cluster0.r55aach.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
//         console.log('mongo db connected')
//     }
//     catch(error){
//         console.log(error);
        
//     }
//  }

//  export default connectDB;


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch(error) {
        console.log(error);
    }
}

export default connectDB;
