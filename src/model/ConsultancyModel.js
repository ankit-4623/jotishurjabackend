import mongoose from "mongoose";

const consultancyRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true },
    fulllName: { type: String, required: true },
    dateofBirth: { type: Date, required: true },
    timeofBirth: { type: String, required: true },
    placeofBirth: { type: String, required: true },
    gender: { type: String, required: true },
    areaOfConcern: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    paymentInfo: {
      id: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        required: true,
        default: "pending",
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const ConsultancyRequest = mongoose.model(
  "ConsultancyRequest",
  consultancyRequestSchema
);

export default ConsultancyRequest;
