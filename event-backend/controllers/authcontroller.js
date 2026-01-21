import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await pool.query("SELECT 1 FROM students WHERE email=$1", [email]);
    if (exists.rowCount) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash the password
    const hash = await bcrypt.hash(password, 10);

    // 👇 insert into password (not password_hash)
    const { rows } = await pool.query(
      "INSERT INTO students (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email",
      [name, email, hash]
    );

    res.status(201).json({ user: rows[0], message: "Registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN (no change needed, already using password)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { rows } = await pool.query(
      "SELECT id,name,email,password FROM students WHERE email=$1",
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
