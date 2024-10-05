import { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);

export default router;
