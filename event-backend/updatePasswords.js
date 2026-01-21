import bcrypt from "bcryptjs";
import { pool } from "./config/db.js"; // make sure this points to your PostgreSQL pool

const updatePasswords = async () => {
  const students = await pool.query("SELECT id, name, email FROM students");
  
  for (let student of students.rows) {
    const hashed = await bcrypt.hash("mypassword123", 13); // choose a password
    await pool.query("UPDATE students SET password=$1 WHERE id=$2", [hashed, student.id]);
    console.log(`Updated password for ${student.name}`);
  }

  console.log("✅ All passwords updated");
  process.exit(); // exit the script
};

updatePasswords().catch(err => {
  console.error("Error updating passwords:", err);
  process.exit(1);
});
