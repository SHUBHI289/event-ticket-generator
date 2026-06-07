import { pool } from '../config/db.js';

export const createEventTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        time TIME,
        location VARCHAR(200),
        capacity INT DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Events table ready');
  } catch (err) {
    console.error('❌ Error creating events table:', err);
    throw err;
  }
};

export const createEvent = async (title, description, date, time, location, capacity) => {
  try {
    const result = await pool.query(
      'INSERT INTO events (title, description, date, time, location, capacity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, date, time, location, capacity]
    );
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error creating event:', err);
    throw err;
  }
};

export const getAllEvents = async () => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date DESC');
    return result.rows;
  } catch (err) {
    console.error('❌ Error fetching events:', err);
    throw err;
  }
};

export const getEventById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error fetching event:', err);
    throw err;
  }
};

export const updateEvent = async (id, title, description, date, time, location, capacity) => {
  try {
    const result = await pool.query(
      'UPDATE events SET title = $1, description = $2, date = $3, time = $4, location = $5, capacity = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [title, description, date, time, location, capacity, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error updating event:', err);
    throw err;
  }
};

export const deleteEvent = async (id) => {
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    return true;
  } catch (err) {
    console.error('❌ Error deleting event:', err);
    throw err;
  }
};
