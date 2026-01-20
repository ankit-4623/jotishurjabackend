import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./route/productRoute.js";
import AdressCart from './route/addressRoute.js'
import connectDB from "./config/db.js";
import userRoute from "./route/userRoute.js";
import cookieParser from "cookie-parser";
import Usercart from './route/cartRoute.js'
import Orders from './route/orderRoutes.js'
import consultancyRoute from "./route/consultancyRoute.js";
import { rateLimitmiddleware } from "./middlewares/rateLimit.js";
import serviceRoute from "./route/serviceroute.js";
// import paymentRoute from './route/paymentRoute.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(rateLimitmiddleware);
// app.use(cors());

// routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", Usercart);
app.use("/api/address", AdressCart);
app.use("/api/order", Orders);
// app.use("/api/payment", paymentRoute);
app.use('/api/consultancy',consultancyRoute)
app.use('/api/services', serviceRoute)


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

