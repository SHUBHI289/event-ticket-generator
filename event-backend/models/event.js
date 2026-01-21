import pool from "../config/db.js";

export const createEventTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        date DATE NOT NULL
      )
    `);
    console.log("✅ Events table ready");
  } catch (err) {
    console.error("❌ Error creating Events table:", err.message);
  }
};
