import { pool } from '../config/db.js';

export const createStudentTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Students table ready');
  } catch (err) {
    console.error('❌ Error creating students table:', err);
    throw err;
  }
};

export const createStudent = async (name, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO students (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error creating student:', err);
    throw err;
  }
};

export const getStudentByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error fetching student:', err);
    throw err;
  }
};

export const getStudentById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error fetching student:', err);
    throw err;
  }
};
