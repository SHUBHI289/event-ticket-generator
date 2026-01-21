// routes/ticket.js

import { Router } from "express";
import { generateTicket } from "../controllers/ticketcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = Router();

// Secure ticket download with authentication
router.get("/:registrationId/ticket", authMiddleware, generateTicket);

export default router;   // 🔑 this line makes it a default export
