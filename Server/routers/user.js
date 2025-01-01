import { Router } from "express";
import { getUser, updateMe } from "../Controller/User.js";
import { protect } from "../Controller/Protect.js";
const router = Router();

router.patch("/update-me", protect, updateMe);
router.get("/get-users", protect,getUser)
export default router;