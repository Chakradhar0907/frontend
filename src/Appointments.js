import React, { useEffect, useState } from "react";
import "./Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the backend
  useEffect(() => {
    // Replace the URL with your backend endpoint
    fetch("http://localhost:5000/api/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  return (
    <div className="appointments-container">
      <h3>Your Appointments</h3>
      {appointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Doctor ID</th>
              <th>Specialization</th>
              <th>Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.doctorName}</td>
                <td>{appointment.doctorId}</td>
                <td>{appointment.specialization}</td>
                <td>{appointment.timeSlot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}

export default Appointments;
