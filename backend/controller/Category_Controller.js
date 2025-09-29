import Category from "../models/Category_Schema.js";
export const addCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }
    const category = new Category({
      name,
      description,
      image,
    });
    await category.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// Add multiple categories at once
export const addMultipleCategories = async (req, res) => {
  try {
    const categories = req.body; // expecting an array of category objects

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a non-empty array of categories",
      });
    }

    const savedCategories = await Category.insertMany(categories);

    res.status(201).json({
      success: true,
      message: "Categories added successfully",
      data: savedCategories,
    });
  } catch (error) {
    console.error("Error adding categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add categories",
      error: error.message,
    });
  }
};
