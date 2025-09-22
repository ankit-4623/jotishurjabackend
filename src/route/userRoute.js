import express from 'express';
import { checkOtp, getUserProfile, loginUser, logoutUser, registerUser, resetPassord, sendOtp } from '../controllers/userControllers.js';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/user').get(getUserProfile);

// otp
      
router.route('/send-otp').post(sendOtp);
router.route('/check-otp').post(checkOtp);
router.route('/reset-password').post(resetPassord);

export default router;
