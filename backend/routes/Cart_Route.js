import express from 'express';
import { addToCart, deleteProductFromCart, getCartByUser, removeAllFromCart } from '../controller/cartController.js';
const Cart_Router = express.Router();
Cart_Router.route('/addToCart').post(addToCart);
Cart_Router.route('/removeFromCart').delete(deleteProductFromCart);
Cart_Router.get("/cart/:userId", getCartByUser);
Cart_Router.delete("/cart/removeAll", removeAllFromCart);




export default Cart_Router