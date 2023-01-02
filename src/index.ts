import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import productRouter from "./Route/products";
import userRouter from  "./Route/users";
import reviewRouter from "./Route/reviews";

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());


const connectDB = async () => {
    try {
      const db = "mongodb+srv://Sanyam632000:Snp632000@cluster0.rl9zf.mongodb.net/E-Commerce_2?retryWrites=true&w=majority";
      mongoose.connect(db).then(() => {
        console.log("Connected to database");
      });
    } catch (err) {
      console.error(err);
    }
  };
  

connectDB();

app.use("/product",productRouter)
app.use("/",userRouter)
app.use("/review",reviewRouter)

const server = app.listen(() => {
    console.log(`This is backend running at: ` )
})


export default server;