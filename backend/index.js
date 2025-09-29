import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Razorpay from "razorpay";
import { connectDb } from "./config/Connection.js";
import Cart_Router from "./routes/Cart_Route.js";
import Category_Router from "./routes/Categories_Route.js";
import orderRouter from "./routes/orderRoute.js";
import Product_Router from "./routes/Product_Route.js";
import razorRouter from "./routes/RazorPay_Route.js";
import User_Router from "./routes/User_Route.js";
import { importData } from "./controller/GenerateProducts.js";
dotenv.config();
const server = express();
const port = 3000;
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/v1", Product_Router);
server.use("/api/v1", Category_Router);
server.use("/api/v1", User_Router);
server.use("/api/v1", Cart_Router);
server.use("/api/v1", razorRouter);
// server.use("/api/v1", Address_Route);
server.use("/api/v1", orderRouter);



export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_ID,
  key_secret: process.env.RAZORPAY_API_SECRET
});
connectDb();
// importData();
server.listen(port, () => {
  console.log("server running on port", port);
});
