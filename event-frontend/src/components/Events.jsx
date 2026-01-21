import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // import hook

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // create navigate instance

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login first to see events");
        navigate("/login"); // redirect to login
        return;
      }
      try {
        const res = await axios.get(`${API_BASE}/api/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        alert("Failed to load events");
      }
    };
    fetchEvents();
  }, [navigate]);

  const handleRegister = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login first to register!");
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `${API_BASE}/api/events/register/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Successfully registered!");
    } catch (err) {
      console.log(err.response || err);
      alert(
        err.response?.data?.message ||
          "Registration failed. You may be already registered."
      );
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
 {/* Optional abstract shapes */}
  <div
    style={{
      position: "absolute",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.05)",
      top: "-50px",
      left: "-50px",
    }}
  ></div>
  <div
    style={{
      position: "absolute",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.05)",
      bottom: "-100px",
      right: "-100px",
    }}
  ></div>

    <div className="container mt-5">
      <h2
        className="text-center mb-4"
        style={{
          color: "#F1EFFF",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
        }}
      >
        All Events
      </h2>

      {events.length === 0 ? (
        <p style={{ color: "white" }}>No events found</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="text-muted">
                    <strong>Date:</strong> {event.date}
                  </p>
                  <button
                    onClick={() => handleRegister(event.id)}
                    className="btn"
                    style={{ backgroundColor: "#6A0DAD", color: "white" }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-5">
        <button
          className="btn btn-secondary shadow-lg"
          onClick={() => navigate("/login")}
          style={{ backgroundColor: "white", color: "black" }}
        >
          ← Go Back to Login
        </button>
      </footer>
    </div>
  </div>
);
}

export default Events;         