import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./route/productRoute.js";
import connectDB from "./config/db.js";
import userRoute from "./route/userRoute.js";
import cookieParser from "cookie-parser";
import Usercart from './route/cartRoute.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", Usercart);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
