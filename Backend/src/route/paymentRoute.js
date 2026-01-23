import express from 'express';
import { verifyUserAuth } from '../middlewares/userAuth.js';
import { paymentVerification, processPayment, sendAPIKey } from '../controllers/paymentControllers.js';

const router = express.Router();

router.route('/process').post(verifyUserAuth, processPayment);
router.route('/getKey').get(verifyUserAuth, sendAPIKey);
router.route('/verify').post(verifyUserAuth, paymentVerification);

export default router;
