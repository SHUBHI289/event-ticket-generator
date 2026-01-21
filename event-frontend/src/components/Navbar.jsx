import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "#6A0DAD", // semi-transparent dark purple
        backdropFilter: "blur(6px)",       // frosted effect
        padding: "12px 24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // shadow for separation
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand text-white fw-bold"
          to="/"
           style={{ fontSize: "1.8rem",           // bigger for emphasis
                   fontFamily: "Montserrat", 
                   letterSpacing: "1px"          // subtle spacing for elegance
          }}

        >
          Event Registration & Ticketing System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <Link
                className="btn btn-outline-light d-flex align-items-center"
                to="/events"
              >
                <i className="bi bi-calendar-event me-2"></i>
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-outline-light"
                to="/registrations"
              >
                <i className="bi bi-journal-check me-2"></i>
                My Registrations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;