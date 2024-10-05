import { Router } from "express";
import { updateMe } from "../Controller/User.js";
import { protect } from "../Controller/Protect.js";
const router = Router();

router.patch("/update-me", protect, updateMe);

export default router;