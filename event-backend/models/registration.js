import { pool } from '../config/db.js';

export const createRegistrationTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
        ticket_number VARCHAR(50) UNIQUE,
        status VARCHAR(20) DEFAULT 'registered',
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, event_id)
      );
    `);
    console.log('✅ Registrations table ready');
  } catch (err) {
    console.error('❌ Error creating registrations table:', err);
    throw err;
  }
};

export const registerStudent = async (student_id, event_id, ticket_number) => {
  try {
    const result = await pool.query(
      'INSERT INTO registrations (student_id, event_id, ticket_number) VALUES ($1, $2, $3) RETURNING *',
      [student_id, event_id, ticket_number]
    );
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error registering student:', err);
    throw err;
  }
};

export const getRegistrationsByStudent = async (student_id) => {
  try {
    const result = await pool.query(
      `SELECT r.*, e.title, e.date, e.location FROM registrations r 
       JOIN events e ON r.event_id = e.id 
       WHERE r.student_id = $1 
       ORDER BY e.date DESC`,
      [student_id]
    );
    return result.rows;
  } catch (err) {
    console.error('❌ Error fetching student registrations:', err);
    throw err;
  }
};

export const getRegistrationsByEvent = async (event_id) => {
  try {
    const result = await pool.query(
      `SELECT r.*, s.name, s.email FROM registrations r 
       JOIN students s ON r.student_id = s.id 
       WHERE r.event_id = $1 
       ORDER BY r.registered_at DESC`,
      [event_id]
    );
    return result.rows;
  } catch (err) {
    console.error('❌ Error fetching event registrations:', err);
    throw err;
  }
};

export const getRegistrationByTicket = async (ticket_number) => {
  try {
    const result = await pool.query(
      `SELECT r.*, s.name, s.email, e.title, e.date FROM registrations r 
       JOIN students s ON r.student_id = s.id 
       JOIN events e ON r.event_id = e.id 
       WHERE r.ticket_number = $1`,
      [ticket_number]
    );
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error fetching registration by ticket:', err);
    throw err;
  }
};

export const cancelRegistration = async (id) => {
  try {
    const result = await pool.query(
      'UPDATE registrations SET status = $1 WHERE id = $2 RETURNING *',
      ['cancelled', id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error cancelling registration:', err);
    throw err;
  }
};
