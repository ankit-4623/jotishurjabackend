import PujaBooking from "../model/PujaBookingModel.js";

// Create a new puja booking
export const createPujaBooking = async (req, res) => {
    try {
        const { name, phone, email, pujaType, description, mode } = req.body;

        const newBooking = new PujaBooking({
            user: req.user._id,
            name,
            phone,
            email,
            pujaType,
            description,
            mode,
        });

        await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Puja booking created successfully",
            data: newBooking,
        });
    } catch (error) {
        console.log("Error creating puja booking:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create puja booking",
        });
    }
};

// Get all puja bookings for the logged-in user
export const getUserPujaBookings = async (req, res) => {
    try {
        const bookings = await PujaBooking.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.log("Error fetching user puja bookings:", error);
        res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
};

// Admin: Get all puja bookings
export const getAdminAllPujaBookings = async (req, res) => {
    try {
        const bookings = await PujaBooking.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.log("Error fetching all puja bookings:", error);
        res.status(500).json({ success: false, message: "Failed to fetch bookings" });
    }
};

// Admin: Update puja booking status
export const updatePujaBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await PujaBooking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        console.log("Error updating puja booking status:", error);
        res.status(500).json({ success: false, message: "Failed to update booking status" });
    }
};

// Delete puja booking
export const deletePujaBooking = async (req, res) => {
    try {
        const booking = await PujaBooking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.status(200).json({ success: true, message: "Booking deleted successfully" });
    } catch (error) {
        console.log("Error deleting puja booking:", error);
        res.status(500).json({ success: false, message: "Failed to delete booking" });
    }
};
