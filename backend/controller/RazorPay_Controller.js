import crypto from "crypto";
import { razorpayInstance } from "../index.js";
import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
export const createOrder = async (req, res) => {
  try {
    const { userId, totalPrice, shippingAddress, products } = req.body;
    console.log(products);
    if (!shippingAddress || !products || products === 0) {
      return res.status(400).json({ success: false, message: "Missing required order details." });
    }
    const options = {
      amount: Number(req.body.totalPrice * 100),
      currency: "INR",
      receipt: "receipt#1"
    }
    const order = await razorpayInstance.orders.create(options);

    const pendingOrder = await Order.create({
      userId: userId,
      products: products.map((item) => ({
        productId: item.productId._id,
        brand: item.productId.brand,
        name: item.productId.name,
        price: item.productId.price,
        images: item.productId.images?.length ? item.productId.images : [],
        quantity: item.quantity
      })),
      paymentInfo: {
        razorpay_order_id: order.id,
        razorpay_payment_id: "",
        razorpay_signature: "",
        totalPrice: totalPrice,
      },
      orderStatus: 'Pending',
      shippingAddress: shippingAddress,
      isPaid: false
    });
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: order
    });

  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating order",
      error: error.message
    })
  }
}

export const getKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_API_ID
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching key"
    })
  }
}

export const paymentVerification = async (req, res) => {
  console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(sign.toString())
    .digest('hex');
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Missing Razorpay fields" });
  }

  if (expectedSign === razorpay_signature) {
    const data = await Cart.findOneAndUpdate(
      { userId: req.body.notes?.userId },
      { $set: { products: [] } },
      { new: true }
    );
    console.log(data)
    return res.redirect('http://localhost:5173/payment-success');

  } else {
    res.status(400).json({
      success: false,
      message: "Invalid signature sent!"
    })
  }
}


export const paymentVerification02 = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing Razorpay fields" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature sent!"
      });
    }
    const orderDetails = await Order.findOne({ "paymentInfo.razorpay_order_id": razorpay_order_id });
    console.log("payment verification order details:");
    console.log(orderDetails);

    if (!orderDetails) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderDetails._id, {
      "paymentInfo.razorpay_payment_id": razorpay_payment_id,
      "paymentInfo.razorpay_signature": razorpay_signature,
      orderStatus: "Processing",
      isPaid: true,
      paidAt: new Date()
    });
    const userId = orderDetails.userId;

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ success: false, message: "Cart not found for user." });
    }


    // 4. Clear the user's cart
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: [] } }
    );

    // 5. Send a success response. The front end will handle redirection.
    // res.status(200).json({
    //   success: true,
    //   message: "Payment successful and order created!",
    //   orderId: updatedOrder._id,
    // });
    return res.redirect('http://localhost:5173/profile');
    // return res.redirect('http://localhost:5173/payment-success');

  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during payment verification.",
      error: error.message
    });
  }
};