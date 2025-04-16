import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./BookAppointment.css"; // Ensure this CSS file exists
 
const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  // Fetch doctors list from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Authentication required. Please log in.");
          return;
        }
 
        const response = await fetch("https://localhost:7263/api/DoctorRegistration", {
          headers: { Authorization: `Bearer ${token}` },
        });
 
        if (!response.ok) throw new Error("Failed to fetch doctors");
 
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        setMessage("Error fetching doctors: " + error.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchDoctors();
  }, []);
 
  // Handle appointment booking
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setMessage("");
 
    const selectedDoctorDetails = doctors.find(doctor => doctor.doctorId === selectedDoctor);
 
    const appointmentData = {
      doctorId: selectedDoctor,
      doctorName: selectedDoctorDetails.doctorName,
      specialization: selectedDoctorDetails.specialization,
      patientId: localStorage.getItem("patientId"), // Assuming patientId is stored in localStorage
      appointmentDate: date,
      appointmentTime: time,
    };
 
    console.log("Appointment data:", appointmentData); // Log the appointment data
 
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authentication required. Please log in.");
        return;
      }
 
      const response = await fetch("https://localhost:7263/api/Appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });
 
      console.log("Response status:", response.status); // Log the response status
 
      if (!response.ok) throw new Error("Failed to book appointment");
 
      setMessage("Appointment booked successfully!");
      setTimeout(() => navigate("/patient-dashboard"), 2000);
    } catch (error) {
      console.error("Error booking appointment:", error); // Log the error for debugging
      setMessage("Error booking appointment: " + error.message);
    }
  };
 
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="avatar"></div>
        <h3>Patient Name</h3>
        <p>{localStorage.getItem("email")}</p>
 
        <ul>
          <li><Link to="/patient-dashboard">Home</Link></li>
          <li><Link to="/appointments">Appointments</Link></li>
          <li><Link to="/encounters">Medical History</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
 
        <button className="logout-button" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
 
      {/* Main Section */}
      <div className="main">
        <div className="appointment-container">
          <h2>Book an Appointment</h2>
          {message && <p className="message">{message}</p>}
          {loading ? (
            <p>Loading doctors...</p>
          ) : (
            <form onSubmit={handleBookAppointment}>
              <div className="input-group">
                <label>Specialization</label>
                <select value={specialization} onChange={(e) => setSpecialization(e.target.value)} required>
                  <option value="">Select Specialization</option>
                  <option value="Cardiology">Cardiology - Heart</option>
                  <option value="Dermatology">Dermatology - Skin</option>
                  <option value="Neurology">Neurology - Brain</option>
                  <option value="Orthopedics">Orthopedics - Bones</option>
                  <option value="Pediatrics">Pediatrics - Children</option>
                  <option value="Psychiatry">Psychiatry - Mental Health</option>
                  <option value="Radiology">Radiology - Imaging</option>
                  <option value="Surgery">Surgery - General</option>
                </select>
              </div>
 
              <div className="input-group">
                <label>Doctor</label>
                <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                  <option value="">Select a Doctor</option>
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <option key={doctor.doctorId} value={doctor.doctorId}>{doctor.doctorName}</option>
                    ))
                  ) : (
                    <option value="" disabled>No doctors available</option>
                  )}
                </select>
              </div>
 
              <div className="input-group">
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
 
              <div className="input-group">
                <label>Time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
 
              <button type="submit" className="book-button">Book Appointment</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default BookAppointment;
 
 