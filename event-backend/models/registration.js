import pool from "../config/db.js";

export const createRegistrationTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        student_id INT REFERENCES users(id) ON DELETE CASCADE,
        event_id INT REFERENCES events(id) ON DELETE CASCADE,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Registrations table ready");
  } catch (err) {
    console.error("❌ Error creating Registrations table:", err.message);
  }
};
