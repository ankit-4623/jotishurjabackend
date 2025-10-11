import express from "express";
import { createConsultancyRequest, deleteConsultancyRequest, getAllConsultancyRequests, getConsultancyRequestById, updateConsultancyRequestStatus } from "../controllers/consultancyControllers.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";

const consultancyRoute=express.Router();

consultancyRoute.post('/addConsultancy',verifyUserAuth,createConsultancyRequest)
consultancyRoute.get('/getallreq',verifyUserAuth,getAllConsultancyRequests)
consultancyRoute.get('/getsinglereq/:id',verifyUserAuth,getConsultancyRequestById)
consultancyRoute.put('/updatereq/:id',verifyUserAuth,updateConsultancyRequestStatus)
consultancyRoute.delete('/deletereq/:id',verifyUserAuth,deleteConsultancyRequest)



export default consultancyRoute


