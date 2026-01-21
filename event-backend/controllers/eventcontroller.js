// controllers/eventController.js
import pool from "../config/db.js";

// 📌 Get all events
export const getEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY date ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Create new event
export const createEvent = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO events (title, description, date) VALUES ($1, $2, $3) RETURNING *",
      [title, description, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Register a student for an event
export const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const studentId = req.user.id;  // comes from authMiddleware

    // Check if already registered
    const existing = await pool.query(
      "SELECT * FROM registrations WHERE student_id=$1 AND event_id=$2",
      [studentId, eventId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Student already registered for this event" });
    }

    // Insert into registrations table
    const result = await pool.query(
      "INSERT INTO registrations (student_id, event_id) VALUES ($1, $2) RETURNING *",
      [studentId, eventId]
    );
    
    res.json({
      message: "✅ Registration successful",
      registration: result.rows[0],
    });

  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};