import express from "express";
import { dailyhoroscope } from "../controllers/serviceControllers.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";

const serviceRoute = express.Router()

serviceRoute.get('/dailyhoroscope',verifyUserAuth, dailyhoroscope);
// serviceRoute.get('/matchmaking', verifyUserAuth, matchmaking);
// serviceRoute.get('/freekundli', verifyUserAuth, freekundli);

export default serviceRoute;