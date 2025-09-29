import Product from "../models/Product_Schema.js";
import ProductCopy from "../models/Product_SchemaCopy.js";


export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      description,
      price,
      discountPrice,
      images,
      material,
      color,
      dimensions,
      weight,
      capacity,
      stock,
      features,
      warranty,
      asin,
    } = req.body;

    // Validation
    if (!name || !brand || !description || !price || !material || !color) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }



    // Parse dimensions safely
    let parsedDimensions = {};
    if (dimensions) {
      try {
        parsedDimensions = typeof dimensions === "string" ? JSON.parse(dimensions) : dimensions;
      } catch (err) {
        parsedDimensions = {};
      }
    }

    const product = new Product({
      name,
      brand,
      category,
      description,
      price,
      discountPrice,
      images,
      material,
      color,
      dimensions: parsedDimensions,
      weight,
      capacity,
      stock,
      features,
      warranty,
      asin,
    });
    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: createdProduct,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await ProductCopy.find({});
    console.log(products)
    res.status(200).json({
      success: true,
      data: products,
      message: "Product Fetched Successfully!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  const category = req.query.category; // handbag, casual, business
  let { page, limit } = req.query;

  page = parseInt(page) || 1;       // default page 1
  limit = parseInt(limit) || 20;    // default 10 products per page
  const skip = (page - 1) * limit;

  try {
    // Fetch products with category filter and pagination
    const products = await Product.find({ category: { $regex: new RegExp(category, "i") } })
      .skip(skip)
      .limit(limit);

    // Total products count in this category
    const total = await Product.countDocuments({ category: { $regex: new RegExp(category, "i") } });

    res.status(200).json({
      success: true,
      data: products,
      total,
      page,
      pages: Math.ceil(total / limit),
      message: "Products fetched successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


export const addMultipleProducts = async (req, res) => {
  try {
    const products = req.body; // Expecting an array of products

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of products",
      });
    }

    // Insert all products
    const savedProducts = await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: `${savedProducts.length} products added successfully!`,
      data: savedProducts,
    });
  } catch (error) {
    console.error("Error adding multiple products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add products",
      error: error.message,
    });
  }
};

export const bestSeller = async (req, res)=>{
  try {
    const products = await Product.find({ isBestseller: true }).limit(10);
    res.status(200).json({
      success: true,
      data: products,
      message: "Bestseller Products Fetched Successfully!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const newArrival = async (req, res)=>{
  try {
    const products = await Product.find({ isNewArrival: true }).limit(10);
    res.status(200).json({
      success: true,
      data: products,
      message: "New Arrival Products Fetched Successfully!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  } 
}

export const getProductByQuery = async (req, res)=>{
  const query = req.query.q;
  try {
    const products = await Product.find({ name: { $regex: new RegExp(query, "i") } }).limit(20);
    res.status(200).json({
      success: true,
      data: products,
      message: "Products Fetched Successfully!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
