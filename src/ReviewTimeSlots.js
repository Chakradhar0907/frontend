import React, { useEffect, useState } from 'react';
import './ReviewTimeSlots.css';

function ReviewTimeSlots() {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetch('http://your-backend-url/api/doctor/time-slots')
      .then((response) => response.json())
      .then((data) => setTimeSlots(data))
      .catch((error) => console.error('Error fetching time slots:', error));
  }, []);

  return (
    <div className="review-time-slots-container">
      <h3>Review Time Slots</h3>
      {timeSlots.length > 0 ? (
        <table className="time-slots-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, index) => (
              <tr key={index}>
                <td>{slot.date}</td>
                <td>{slot.time}</td>
                <td>{slot.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No time slots found.</p>
      )}
    </div>
  );
}

export default ReviewTimeSlots;