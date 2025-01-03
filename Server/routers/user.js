import { Router } from "express";
import { getFriends, getRequest, getUser, updateMe } from "../Controller/User.js";
import { protect } from "../Controller/Protect.js";
const router = Router();

router.patch("/update-me", protect, updateMe);
router.get("/get-users", protect,getUser);
router.get("/get-friends", protect,getFriends);
router.get("/get-request", protect,getRequest);

export default router;