import express from 'express';
import { checkOtp, getUserProfile, loginUser, logoutUser, registerUser, resetPasswordController, sendOtp, updateUserProfile } from '../controllers/userControllers.js';
import { verifyUserAuth } from '../middlewares/userAuth.js';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/user').get(verifyUserAuth, getUserProfile);
router.route('/user').put(verifyUserAuth, updateUserProfile);

// otp

router.route('/send-otp').post(sendOtp);
router.route('/check-otp').post(checkOtp);
router.route('/reset-password').post(resetPasswordController);

export default router;
