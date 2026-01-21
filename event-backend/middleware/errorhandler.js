// middleware/errorHandler.js
export default function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
}
