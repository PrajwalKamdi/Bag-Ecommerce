import Product from "../models/Product_Schema.js";

const categories = ["shoulder_bag", "business", "Crossbody Bag", "Clutch", "casual", "Satchel", "Sling Bag", "Hobo Bag", "craft", "clutch", "wedding"];
const colors = ["Black", "Brown", "Tan", "Red", "Blue", "Green", "White", "Beige"];
const materials = ["Leather", "PU Leather", "Canvas", "Polyester", "Nylon", "Fabric"];
const features = ["Water resistant", "Laptop Compartment", "Detachable Strap", "Zip Closure", "Adjustable Handle"];
const brands = ["Lavie", "Fargo", "Miraggio Denice", "Wildcarft", "UrbanLuxe", "FemmeBag", "ChicCarry"];
const products = [];
export const importData = async () => {
  for (let i = 1; i <= 2000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];

    products.push({
      name: `${brand} ${color} ${category}`,
      brand,
      category,
      description: `Stylish ${color.toLowerCase()} ${category.toLowerCase()} made of ${material}. Perfect for daily and party use.`,
      price: Math.floor(Math.random() * (5000 - 1200) + 1200),
      discountPrice: Math.floor(Math.random() * (1000)) + 500,
      images: [
        `https://dummyimage.com/500x500/cccccc/000000&text=${category.replace(" ", "+")}`
      ],
      material,
      color,
      dimensions: {
        height: `${Math.floor(Math.random() * 20) + 20} cm`,
        width: `${Math.floor(Math.random() * 15) + 15} cm`,
        depth: `${Math.floor(Math.random() * 10) + 5} cm`
      },
      weight: `${Math.floor(Math.random() * 1000) + 500} g`,
      capacity: `${Math.floor(Math.random() * 15) + 5} L`,
      ratings: {
        average: (Math.random() * 2 + 3).toFixed(1),
        count: Math.floor(Math.random() * 500)
      },
      stock: Math.floor(Math.random() * 200) + 10,
      features: [features[Math.floor(Math.random() * features.length)]],
      isBestseller: Math.random() < 0.2,
      isNewArrival: Math.random() < 0.3,
      warranty: "1 Year Manufacturer Warranty",
      asin: `ASIN${i}`
    });
  }
  try {
    // await Product.deleteMany(); // Clear old data
    await Product.insertMany(products); // Insert 2000 products
    console.log("🎉 2000 Products Inserted Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting products:", error);
    process.exit(1);
  }
};

