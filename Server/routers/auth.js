import { Router } from "express";
import { login } from "../Controller/login.js";
import { Register, sendOtp, verifiedOtp } from "../Controller/Register.js";
import { resetPassword } from "../Controller/ResetPassword.js";
import { ForgetPassword } from "../Controller/ForgetPassword.js";

const router = Router();

router.post("/login", login);
router.post("/register", Register, sendOtp);
router.post("/verify", verifiedOtp);
router.post("/send-otp", sendOtp);
router.post("/forgot-password", ForgetPassword);
router.post("/reset-password", resetPassword);

export default router;
