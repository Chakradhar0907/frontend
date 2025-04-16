import React, { useState } from 'react';
import './UpdateTimeSlots.css';

function UpdateTimeSlots() {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdate = () => {
    const selectedDateTime = new Date(`${date}T${timeSlot}`);
    const currentDateTime = new Date();

    const timeDifference = selectedDateTime - currentDateTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      setErrorMessage('You can only update time slots at least 24 hours in advance.');
      setSuccessMessage('');
    } else {
      fetch('http://your-backend-url/api/doctor/update-timeslot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, timeSlot }),
      })
        .then((response) => {
          if (response.ok) {
            setSuccessMessage('Time slot updated successfully!');
            setErrorMessage('');
          } else {
            setErrorMessage('Failed to update time slot. Please try again.');
            setSuccessMessage('');
          }
        })
        .catch((error) => {
          console.error('Error updating time slot:', error);
          setErrorMessage('An error occurred. Please try again.');
          setSuccessMessage('');
        });
    }
  };

  return (
    <div className="update-time-slots-container">
      <h3>Update Time Slots</h3>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Time Slot:</label>
        <input type="time" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />
      </div>
      <button className="update-button" onClick={handleUpdate}>
        Update Time Slot
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default UpdateTimeSlots;