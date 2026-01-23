import mongoose from "mongoose";

const consultancyRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    consultancyType: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, default: "" },
    dob: { type: String, default: "" },
    birthTime: { type: String, default: "" },
    birthPlace: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const ConsultancyRequest = mongoose.model(
  "ConsultancyRequest",
  consultancyRequestSchema
);

export default ConsultancyRequest;

