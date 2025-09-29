import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        images: [
          {
            type: String, // URL of images
          },
        ],
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    paymentInfo: {
      razorpay_order_id: {
        type: String,
        required: true,
      },
      razorpay_payment_id: {
        type: String,
        required: false,
      },
      razorpay_signature: {
        type: String,
        required: false,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
    orderStatus: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // 
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;