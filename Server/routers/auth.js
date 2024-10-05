import { Router } from "express";
import { login } from "../Controller/login";
import { Register, sendOtp, verifiedOtp } from "../Controller/Register";
import { resetPassword } from "../Controller/ResetPassword";
import { ForgetPassword } from "../Controller/ForgetPassword";

const router = Router();

router.post("/login", login);
router.post("/register", Register, sendOtp);
router.post("/verify", verifiedOtp);
router.post("/send-otp", sendOtp);
router.post("/forgot-password", ForgetPassword);
router.post("/reset-password", resetPassword);

export default router;
