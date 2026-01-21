import React, { useEffect, useState } from "react";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/registrations", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from backend:", data);
        const finalData = Array.isArray(data) ? data : (data.registrations || []);
        setRegistrations(finalData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ New function to handle PDF download logic
  const handleDownloadTicket = async (registrationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/tickets/${registrationId}/ticket`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Download failed");

      // Convert response to a blob (binary data)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary link to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket-${registrationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Error downloading ticket. Please try again.");
    }
  };

  return (
    <div
      className="min-vh-100 p-5"
      style={{
        background: "linear-gradient(135deg, #4B0082, #6A0DAD)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Shapes */}
      <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-50px", left: "-50px" }}></div>
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", bottom: "-100px", right: "-100px" }}></div>

      <h2 className="text-center mb-4" style={{ color: "#F1EFFF", fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
        My Registrations
      </h2>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {loading ? (
          <p style={{ color: "#F1EFFF" }}>Loading your registrations...</p>
        ) : registrations.length === 0 ? (
          <p style={{ color: "#F1EFFF" }}>You have not registered for any events yet.</p>
        ) : (
          registrations.map((reg, index) => (
            <div
              key={reg.registration_id || reg.id || index}
              className="card p-3 shadow-lg border-0"
              style={{ width: "280px", borderRadius: "15px", backgroundColor: "rgba(255,255,255,0.95)" }}
            >
              <h5 className="mb-2" style={{ color: "#4B0082", fontWeight: "bold" }}>
                {reg.event_title || reg.eventName || "Untitled Event"}
              </h5>
              
              <p className="mb-1" style={{ color: "#555", fontSize: "0.85rem" }}>
                <strong>Attendee:</strong> {reg.student_name || "User"}
              </p>

              <p style={{ color: "#333", fontSize: "0.9rem" }}>
                <strong>Date:</strong> {new Date(reg.event_date || reg.date || reg.registration_date).toLocaleDateString()}
              </p>

              <button
                className="btn w-100 mt-2"
                onClick={() => handleDownloadTicket(reg.registration_id || reg.id)}
                style={{ 
                  backgroundColor: "#6A0DAD", 
                  color: "#fff", 
                  borderRadius: "10px", 
                  fontWeight: 600,
                  transition: "0.3s"
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#4B0082")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#6A0DAD")}
              >
                Download Ticket
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;