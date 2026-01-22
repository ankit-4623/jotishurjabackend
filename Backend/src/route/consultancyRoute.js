import express from "express";
import { createConsultancyRequest, deleteConsultancyRequest, getAllConsultancyRequests, getAdminAllConsultancyRequests, getConsultancyRequestById, updateConsultancyRequestStatus } from "../controllers/consultancyControllers.js";
import { verifyUserAuth, roleBasedAccess } from "../middlewares/userAuth.js";

const consultancyRoute = express.Router();

// User routes
consultancyRoute.post('/addConsultancy', verifyUserAuth, createConsultancyRequest)
consultancyRoute.get('/getallreq', verifyUserAuth, getAllConsultancyRequests)
consultancyRoute.get('/getsinglereq/:id', verifyUserAuth, getConsultancyRequestById)
consultancyRoute.put('/updatereq/:id', verifyUserAuth, updateConsultancyRequestStatus)
consultancyRoute.delete('/deletereq/:id', verifyUserAuth, deleteConsultancyRequest)

// Admin routes
consultancyRoute.get('/admin/all', verifyUserAuth, roleBasedAccess("admin"), getAdminAllConsultancyRequests)

export default consultancyRoute


