// Script to list all users
// Run with: node src/scripts/listUsers.js

import mongoose from "mongoose";
import "../config/loadEnv.js";
import User from "../model/userModel.js";

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB\n");

    const users = await User.find({}, "email role name");
    console.log("Users in database:");
    console.log("==================");
    users.forEach((u) => {
      console.log(`Email: ${u.email} | Role: ${u.role} | Name: ${u.name}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

listUsers();
