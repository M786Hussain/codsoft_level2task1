import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.rout.js";
import companyRoute from "./routes/company.rout.js";
import jobRoute from    "./routes/job.rout.js"
import applicationRoute from "./routes/application.rout.js"


dotenv.config({});

const app = express();

app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corOpration = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corOpration))
const PORT = process.env.PORT || 3000

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"

app.listen(PORT, ()=>{
    connectDB()
    console.log(`server is running on port ${PORT}`);
    
})