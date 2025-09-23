import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import e from "express";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
 
},{timestamps: true});

userSchema.pre('save', async function(next) {
 try {
   if (!this.isModified('password')) {
    return next();
  }
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
  
 } catch (error) {
  console.log(error);
 }
});

userSchema.methods.isPasswordMatch = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

const User = mongoose.model("User", userSchema);

export default User;
