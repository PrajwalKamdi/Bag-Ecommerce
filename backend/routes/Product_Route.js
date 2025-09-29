import express from "express";
import { addMultipleProducts, bestSeller, createProduct, getAllProduct, getProductById, getProductByQuery, getProductsByCategory, newArrival } from "../controller/Product_Controller.js";
const Product_Router = express.Router();
Product_Router.route('/createProduct').post(createProduct);
Product_Router.route('/products').get(getAllProduct);
Product_Router.route('/products/bestseller').get(bestSeller);
Product_Router.route('/products/newArrival').get(newArrival);
Product_Router.route('/products/category').get(getProductsByCategory);
Product_Router.route('/products/multiple').post(addMultipleProducts);
Product_Router.route('/products/search').get(getProductByQuery);
Product_Router.route('/products/:id').get(getProductById);


export default Product_Router;