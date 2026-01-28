// Script to make a user an admin
// Run with: node src/scripts/makeAdmin.js <email>

import mongoose from "mongoose";
import "../config/loadEnv.js";
import User from "../model/userModel.js";

const email = process.argv[2];

if (!email) {
  console.log("Usage: node src/scripts/makeAdmin.js <email>");
  process.exit(1);
}

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found`);
      process.exit(1);
    }

    user.role = "admin";
    await user.save();
    console.log(`✅ User ${email} is now an admin!`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

makeAdmin();
