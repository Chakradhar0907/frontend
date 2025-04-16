import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import PatientDashboard from "./PatientDashboard";
import BookAppointment from "./BookAppointment";
import MedicalHistory from "./MedicalHistory";
import Profile from "./Profile";
import DoctorDashboard from "./DoctorDashboard"; // Import DoctorDashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Patient Dashboard Routes */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient-dashboard/book-appointment" element={<BookAppointment />} />
        <Route path="/patient-dashboard/medical-history" element={<MedicalHistory />} />
        <Route path="/patient-dashboard/profile" element={<Profile />} />

        {/* Doctor Dashboard Routes */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-dashboard/appointments" element={<DoctorDashboard activeSection="appointments" />} />
        <Route path="/doctor-dashboard/update-time-slots" element={<DoctorDashboard activeSection="update-time-slots" />} />
        <Route path="/doctor-dashboard/review-time-slots" element={<DoctorDashboard activeSection="review-time-slots" />} />
        <Route path="/doctor-dashboard/cancel-time-slots" element={<DoctorDashboard activeSection="cancel-time-slots" />} />
      </Routes>
    </Router>
  );
}

export default App;