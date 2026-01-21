import express from "express";
import { registerForEvent, getExistingRegistration, getAllRegistrations } from "../controllers/registrationController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/registrations/:eventId", authMiddleware, registerForEvent);
router.get("/registrations/:eventId", authMiddleware, getExistingRegistration);
router.get("/registrations", authMiddleware, getAllRegistrations); // 👈 new route

export default router;

