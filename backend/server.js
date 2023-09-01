import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from "./routes/user-routes";
import AdminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingRouter from "./routes/booking-routes";
import cors from  "cors"

const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",AdminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingRouter);

mongoose.connect(`mongodb+srv://saimessi994:${process.env.MONGODB_PASSWORD}@cluster0.tupjvaa.mongodb.net/?retryWrites=true&w=majority`)
.then((res)=>console.log("connected to database"));

app.get('/',(req,res)=>{
    console.log("hello world");
});


app.listen(5000,()=>{
    console.log("connected to localhost port 5000");
});