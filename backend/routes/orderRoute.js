import express from "express";
import { getOrderByUserId } from "../controller/OrderController.js";
const orderRouter = express.Router();

orderRouter.route('/orders').get(getOrderByUserId);
export default orderRouter;