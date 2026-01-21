import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { pool } from "../config/db.js";

export const generateTicket = async (req, res) => {
  try {
    const studentId = req.user.id; // from JWT
    const { registrationId } = req.params;

    // 1️⃣ Fetch registration + event + student details
    const regQuery = await pool.query(
      `SELECT r.id AS registration_id, s.name AS student_name, s.email AS student_email,
              e.title AS event_title, e.date AS event_date
       FROM registrations r
       JOIN students s ON r.student_id = s.id
       JOIN events e ON r.event_id = e.id
       WHERE r.id=$1 AND r.student_id=$2`,
      [registrationId, studentId]
    );

    if (regQuery.rows.length === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    const registration = regQuery.rows[0];

    // 2️⃣ Generate QR code containing a simple token or registration ID
    const qrData = `RegistrationID:${registration.registration_id}`;
    const qrCodeImage = await QRCode.toDataURL(qrData);

    // Convert Base64 string → Buffer
    const base64Data = qrCodeImage.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(base64Data, "base64");

    // 3️⃣ Create PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ticket-${registration.registration_id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("Event Ticket", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(`Student: ${registration.student_name}`);
    doc.text(`Email: ${registration.student_email}`);
    doc.text(`Event: ${registration.event_title}`);

    // ✅ FIX: use registration.event_date instead of eventDate
    const eventDateFormatted = new Date(registration.event_date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    doc.text(`Date: ${eventDateFormatted}`);
    doc.moveDown();

    doc.text("Scan this QR code at the event:");
    doc.image(qrBuffer, { width: 150, align: "center" });

    doc.end();
  } catch (error) {
    console.error("Ticket Generation Error:", error);
    // ⚠️ Important: only send JSON if headers aren't already sent
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error" });
    }
  }
};
