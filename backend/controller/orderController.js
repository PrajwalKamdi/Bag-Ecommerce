import Order from "../models/orderSchema.js"

export const getOrderByUserId = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ success: false, message: "Missing userId in query parameters." });
  }
  try {
    const data = await Order.find({ userId }).sort({ createdAt: -1 });
    console.log(data.orders);
    res.status(200).json({
      success: true,
      orders: data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching orders",
      error: error.message
    })
  }
}