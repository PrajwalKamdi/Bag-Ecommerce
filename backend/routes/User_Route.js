import express from 'express';
import { getAllUsers, loginUser, registerUser } from '../controller/userController.js';
const User_Router = express.Router();
User_Router.route('/sign-up').post(registerUser);
User_Router.route('/login').post(loginUser);
User_Router.route('/users').get(getAllUsers);

export default User_Router;