import express from "express";
import {
    createPujaBooking,
    getUserPujaBookings,
    getAdminAllPujaBookings,
    updatePujaBookingStatus,
    deletePujaBooking,
} from "../controllers/pujaBookingControllers.js";
import { verifyUserAuth, roleBasedAccess } from "../middlewares/userAuth.js";

const pujaBookingRoute = express.Router();

// User routes
pujaBookingRoute.post("/addBooking", verifyUserAuth, createPujaBooking);
pujaBookingRoute.get("/getallbookings", verifyUserAuth, getUserPujaBookings);
pujaBookingRoute.delete("/delete/:id", verifyUserAuth, deletePujaBooking);

// Admin routes
pujaBookingRoute.get("/admin/all", verifyUserAuth, roleBasedAccess("admin"), getAdminAllPujaBookings);
pujaBookingRoute.put("/status/:id", verifyUserAuth, roleBasedAccess("admin"), updatePujaBookingStatus);

export default pujaBookingRoute;
