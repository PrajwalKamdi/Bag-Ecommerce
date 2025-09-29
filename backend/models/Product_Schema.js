import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    images: [
      {
        type: String, // URL of images
      },
    ],
    material: {
      type: String,
      enum: ["Leather", "PU Leather", "Canvas", "Polyester", "Nylon", "Fabric", "Other"],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    dimensions: {
      height: String,
      width: String,
      depth: String,
    },
    weight: {
      type: String,
    },
    capacity: {
      type: String, // e.g. "20L"
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    features: [
      {
        type: String, // e.g. "Water resistant", "Laptop Compartment"
      },
    ],
    isBestseller: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    }, warranty: {
      type: String, // e.g. "1 Year Manufacturer Warranty"
    },
    asin: {
      type: String, // like Amazon’s unique ID
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
