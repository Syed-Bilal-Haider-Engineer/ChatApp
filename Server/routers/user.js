import { Router } from "express";
import { updateMe } from "../Controller/User";
import { protect } from "../Controller/Protect";
const router = Router();

router.patch("/update-me", protect, updateMe);

export default router;