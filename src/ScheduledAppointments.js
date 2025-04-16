import React, { useEffect, useState } from 'react';
import './ScheduledAppointments.css';
import MedicalHistory from './MedicalHistory';

function ScheduledAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Fetch scheduled appointments from the backend
  useEffect(() => {
    fetch('http://your-backend-url/api/doctor/scheduled-appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error('Error fetching scheduled appointments:', error));
  }, []);

  // Handle viewing medical history
  const handleViewMedicalHistory = (patientId) => {
    setSelectedPatientId(patientId);
  };

  return (
    <div className="scheduled-appointments-container">
      <h3>Scheduled Appointments</h3>
      {selectedPatientId ? (
        // Render MedicalHistory component for the selected patient
        <MedicalHistory patientId={selectedPatientId} onBack={() => setSelectedPatientId(null)} />
      ) : appointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Appointment Date</th>
              <th>Time Slot</th>
              <th>Medical History</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patientName}</td>
                <td>{appointment.patientId}</td>
                <td>{appointment.date}</td>
                <td>{appointment.timeSlot}</td>
                <td>
                  <button
                    className="view-history-button"
                    onClick={() => handleViewMedicalHistory(appointment.patientId)}
                  >
                    View Medical History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No scheduled appointments found.</p>
      )}
    </div>
  );
}

export default ScheduledAppointments;