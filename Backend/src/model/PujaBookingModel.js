import mongoose from "mongoose";

const pujaBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: [true, "Customer name is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    pujaType: {
        type: String,
        required: [true, "Puja type is required"],
    },
    description: {
        type: String,
        default: "",
    },
    mode: {
        type: String,
        enum: ["online", "offline"],
        default: "online",
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("PujaBooking", pujaBookingSchema);

