import React, { useEffect, useState } from 'react';
import './AppointmentsAttended.css';

function AppointmentsAttended() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://your-backend-url/api/doctor/attended-appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error('Error fetching attended appointments:', error));
  }, []);

  return (
    <div className="appointments-attended-container">
      <h3>Appointments Attended</h3>
      {appointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Time Slot</th>
              <th>Treatment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.timeSlot}</td>
                <td>{appointment.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attended appointments found.</p>
      )}
    </div>
  );
}

export default AppointmentsAttended;