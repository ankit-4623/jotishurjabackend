import express from "express";
import { dailyhoroscope, matchmaking, freekundli } from "../controllers/serviceControllers.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";

const serviceRoute = express.Router()

serviceRoute.get('/dailyhoroscope', verifyUserAuth, dailyhoroscope);
serviceRoute.post('/matchmaking', verifyUserAuth, matchmaking);
serviceRoute.post('/freekundli', verifyUserAuth, freekundli);

export default serviceRoute;