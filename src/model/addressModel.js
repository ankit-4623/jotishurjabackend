import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    require: true,
  },

  city: {
    type: String,
    require: true,
  },
  pincode: {
    type: String,
    require: true,
  },
  notes: {
    type: String,
  },

  phone: {
    type: Number,
    require: true,
  },
},{timestamps: true});

const Address = mongoose.model("Address",addressSchema)
export default Address
