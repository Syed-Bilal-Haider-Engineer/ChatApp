import { Router } from "express";
import authRoute from "./auth.js";
import userRoute from "./user.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);

export default router;
