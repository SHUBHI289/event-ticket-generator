import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

// ✅ Register student for an event
const registerForEvent = async (req, res) => {
  const studentId = req.user.id; // from JWT
  const eventId = parseInt(req.params.eventId);

  if (isNaN(eventId)) return res.status(400).json({ message: "Invalid event ID" });

  try {
    // check if event exists
    const eventCheck = await pool.query("SELECT * FROM events WHERE id=$1", [eventId]);
    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

console.log("Registering student:", studentId, "for event:", eventId);

    // check if registration already exists
    const existing = await pool.query(
      "SELECT * FROM registrations WHERE student_id=$1 AND event_id=$2",
      [studentId, eventId]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    // generate unique registration code
    const registrationCode = "REG-" + uuidv4().slice(0, 8).toUpperCase();

    // insert registration
    const result = await pool.query(
      "INSERT INTO registrations (student_id, event_id, registration_code) VALUES ($1, $2, $3) RETURNING *",
      [studentId, eventId, registrationCode]
    );

    res.status(201).json({
      message: "✅ Successfully registered for the event",
      registration: result.rows[0], // includes registration_code now
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyRegistrations = async (req, res) => {
  const studentId = req.user.id; // from JWT

  try {
    const result = await pool.query(
      `SELECT r.id AS registration_id, r.registration_code, r.registered_at, 
              e.id AS event_id, e.title AS event_title, e.date AS event_date, e.description
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.student_id = $1`,
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({
        message: "You have not registered for any event yet",
        registrations: []
      });
    }

    res.json({
      message: "✅ Registrations found",
      registrations: result.rows,
    });
  } catch (error) {
    console.error("Get My Registrations Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Fetch existing registration for a student and event 
const getExistingRegistration = async (req, res) => { 
  console.log("JWT user:", req.user); 
  const studentId = req.user.id; // from authMiddleware 
  const { eventId } = req.params; 
  try { 
    // fetch existing registration 
    const existing = await pool.query( 
      "SELECT * FROM registrations WHERE student_id=$1 AND event_id=$2", 
      [studentId, eventId] 
    ); 
    if (existing.rows.length === 0) { 
      return res.status(404).json({ message: "Registration not found" }); 
    } 
    res.json({ 
      message: "✅ Registration found", 
      registration: existing.rows[0], 
    }); 
  } catch (error) { 
    console.error("Fetch Existing Registration Error:", error); 
    res.status(500).json({ message: "Server error" }); 
  } 
};


// ✅ Get all registrations of logged-in student
const getAllRegistrations = async (req, res) => {
  const studentId = req.user.id; // from JWT

  try {
    const result = await pool.query(
      `SELECT r.id AS registration_id, e.title AS event_title, e.date AS event_date
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.student_id = $1`,
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No registrations found" });
    }

    res.json({
      message: "✅ Registrations found",
      registrations: result.rows,
    });
  } catch (error) {
    console.error("Get All Registrations Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { registerForEvent, getExistingRegistration, getMyRegistrations, getAllRegistrations };
