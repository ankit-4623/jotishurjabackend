import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!existingUser) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const isPasswordMatch = await existingUser.isPasswordMatch(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User login successfully", existingUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logoutUser = async (req, res) => {
      res.clearCookie("token");
      res.status(200).json({ message: "User logged out successfully" });
};
