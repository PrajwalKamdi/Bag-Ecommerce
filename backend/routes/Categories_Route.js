import express from 'express'
import { addCategory, addMultipleCategories, getCategories } from '../controller/Category_Controller.js';
const Category_Router = express.Router();
Category_Router.route('/addCategory').post(addCategory);
Category_Router.route('/categories').get(getCategories);
Category_Router.route('/add-multiple').post(addMultipleCategories);
export default Category_Router;