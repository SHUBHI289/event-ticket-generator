import QRCode from "qrcode";

// Generate a QR code as Data URL
export const generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text); // returns Base64 string
  } catch (err) {
    console.error("❌ QR code generation failed:", err.message);
    return null;
  }
};
