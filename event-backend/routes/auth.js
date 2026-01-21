import express from "express";
import { registerUser, loginUser } from "../controllers/authcontroller.js";

const router = express.Router();

// ✅ Register new student
router.post("/register", registerUser);

// ✅ Login existing student
router.post("/login", loginUser);

export default router;
  
