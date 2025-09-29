import dotenv from 'dotenv';
import experess from 'express';
import { createOrder, getKey, paymentVerification02 } from '../controller/RazorPay_Controller.js';
dotenv.config();
const razorRouter = experess.Router();
razorRouter.route('/create-order').post(createOrder);
razorRouter.route('/get-key').get(getKey);
razorRouter.route('/payment-verification').post(paymentVerification02);

export default razorRouter;