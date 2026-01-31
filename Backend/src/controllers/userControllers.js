import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";


// email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// Register User
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

// Login User
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
    const isProd = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
});

    res.status(201).json({ message: "User login successfully", existingUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
  res.status(200).json({ message: "User logged out successfully" });
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });

    }


    res.status(200).json({ success: true, user: req.user });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, dateOfBirth, timeOfBirth, placeOfBirth, gender } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (timeOfBirth) updateData.timeOfBirth = timeOfBirth;
    if (placeOfBirth) updateData.placeOfBirth = placeOfBirth;
    if (gender) updateData.gender = gender;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.log(`Error updating profile: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// send otp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const buffer = crypto.randomBytes(4);
      const token = (buffer.readUInt32BE(0) % 900000) + 100000;
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 900000; // 15 minutes
      await user.save();
      const mailOption = {
        from: `JotishUrja <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset",
        text: `You requested a password reset. Your OTP is: ${token}`,
      };

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.error("Nodemailer Error:", error);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          res.status(200).json({ message: "OTP sent successfully" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// check otp
export const checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({ message: "otp is invalid or has expired" });
    }

    await user.save();
    res.status(200).json({ message: "OTP is Successfully Verified" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// reset password

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.password = newpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server Error",
    });
  }
};
