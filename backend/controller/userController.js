import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import config from 'dotenv'
import bcrypt from 'bcryptjs'
import Cart from '../models/cartSchema.js'
// helper to generate JWT
config.configDotenv();
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, number, password } = req.body;

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPass = bcrypt.hashSync(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      number,
      password: hashPass
    });

    await Cart.create({
      userId: user._id,
      products: [],
    });


    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found!"
      })
    }
    const decodedPass = bcrypt.compareSync(password, user.password);
    if (decodedPass) {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      success: true,
      users: data,
      message: "Users Fetched SuccessFully!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Fetch the users!"
    });
  }
}


