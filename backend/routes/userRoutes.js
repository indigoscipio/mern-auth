import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//AUTH
router.post("/auth", authUser);
//REGISTER
router.post("/register", registerUser);
//LOG OUT
router.post("/logout", logoutUser);
//GET PROFILE
router.get("/profile", protect, getUserProfile);
//UPDATE PROFILE
router.put("/profile", protect, updateUserProfile);

export default router;
