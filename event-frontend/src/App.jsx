import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Events from "./components/Events";
import MyRegistrations from "./components/MyRegistrations";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/registrations" element={<ProtectedRoute><MyRegistrations /></ProtectedRoute>} />
        <Route path="*" element={<Login />} />  {/* catches all unmatched URLs */}
      </Routes>
    </>
  );
};

export default App;
