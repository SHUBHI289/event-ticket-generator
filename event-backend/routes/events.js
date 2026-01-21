import express from "express";
import { getEvents, createEvent, registerEvent } from "../controllers/eventcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// ✅ Routes
router.get("/", authMiddleware, getEvents);  // Get all events
router.post("/", authMiddleware, createEvent);  // Create new event (protected)

// ✅ Register for an event (protected)
router.post("/register/:eventId", authMiddleware, registerEvent);

export default router;
