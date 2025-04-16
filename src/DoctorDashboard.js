import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';
import { Link } from 'react-router-dom';
 
function DoctorDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [doctorData, setDoctorData] = useState(null); // To store doctor details
  const [availabilityData, setAvailabilityData] = useState({
    availableDate: '',
    startTime: '',
    endTime: '',
  });
  const [timeSlotId, setTimeSlotId] = useState(''); // To store the time slot ID to cancel
  const [timeSlots, setTimeSlots] = useState([]); // To store the list of time slots
 
  // Fetch doctor details from backend on component mount
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch('https://localhost:7263/api/DoctorRegistration', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
 
        if (response.ok) {
          const data = await response.json();
          setDoctorData(data[0]); // Assuming the response is an array and we need the first item
          console.log('Fetched doctor details:', data[0]);
        } else {
          console.error('Failed to fetch doctor details');
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
 
    fetchDoctorDetails();
  }, []);
 
  // Fetch time slots from backend
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!doctorData?.doctorId) return;
 
      try {
        const response = await fetch(`https://localhost:7263/api/DoctorAvailability/allit/${doctorData.doctorId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
 
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched time slots:', data); // Log the fetched data
          setTimeSlots(data); // Assuming the response is an array of time slots
        } else {
          console.error('Failed to fetch time slots');
        }
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    };
 
    fetchTimeSlots();
  }, [doctorData]);
 
  // Function to ensure time includes seconds
  const formatTimeWithSeconds = (time) => {
    return `${time}:00`; // Add ":00" to include seconds
  };
 
  // Handle changes in time slot form inputs
  const handleTimeSlotChange = (e) => {
    setAvailabilityData({
      ...availabilityData,
      [e.target.name]: e.target.value,
    });
  };
 
  // Handle changes in time slot ID input
  const handleTimeSlotIdChange = (e) => {
    setTimeSlotId(e.target.value);
  };
 
  // Add a new time slot for the doctor
  const handleAddTimeSlot = async (e) => {
    e.preventDefault();
    const { availableDate, startTime, endTime } = availabilityData;
 
    // Validation for empty fields
    if (!availableDate || !startTime || !endTime) {
      alert('Please fill in all fields');
      return;
    }
 
    // Ensure time includes seconds
    const formattedStartTime = formatTimeWithSeconds(startTime);
    const formattedEndTime = formatTimeWithSeconds(endTime);
 
    // Construct the payload for POST request
    const payload = {
      doctorId: doctorData.doctorId, // Assuming doctor data contains doctorId
      availableDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };
 
    try {
      const response = await fetch('https://localhost:7263/api/DoctorAvailability/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
 
      if (response.ok) {
        alert('Time slot added successfully!');
      } else {
        alert('Failed to add time slot');
      }
    } catch (error) {
      console.error('Error adding time slot:', error);
    }
  };
 
  // Cancel a time slot for the doctor
  const handleCancelTimeSlot = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7263/api/DoctorAvailability/delete/${timeSlotId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      if (response.ok) {
        alert('Time slot cancelled successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to cancel time slot:', errorData);
        alert(`Failed to cancel time slot: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error cancelling time slot:', error);
      alert('Error cancelling time slot. Please try again later.');
    }
  };
 
  // Render different sections based on activeSection state
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="welcome-card">
            <h2>Welcome back!</h2>
            <p>Manage your profile and view your stats below.</p>
            <div className="stats">
              <div className="stat-box">
                <h3>Total Appointments</h3>
                <p>50</p>
              </div>
              <div className="stat-box">
                <h3>Cancelled Appointments</h3>
                <p>5</p>
              </div>
            </div>
          </div>
        );
      case 'appointments':
        return <div className="content-card">Here are your appointments.</div>;
      case 'update-time-slots':
        return (
          <div className="content-card">
            <h3>Update your available time slots</h3>
            <form onSubmit={handleAddTimeSlot}>
              <div className="form-group">
                <label>Available Date:</label>
                <input
                  type="date"
                  name="availableDate"
                  value={availabilityData.availableDate}
                  onChange={handleTimeSlotChange}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={availabilityData.startTime}
                  onChange={handleTimeSlotChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={availabilityData.endTime}
                  onChange={handleTimeSlotChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Add Time Slot</button>
            </form>
          </div>
        );
      case 'review-time-slots':
        return (
          <div className="content-card">
            <h3>Review your time slots</h3>
            {timeSlots.length > 0 ? (
              <ul>
                {timeSlots.map((slot) => (
                  <li key={slot.id}>
                    Date: {slot.availableDate}, Start Time: {slot.startTime}, End Time: {slot.endTime}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No time slots available.</p>
            )}
          </div>
        );
      case 'cancel-time-slots':
        return (
          <div className="content-card">
            <h3>Cancel your time slots</h3>
            <form onSubmit={handleCancelTimeSlot}>
              <div className="form-group">
                <label>Time Slot ID:</label>
                <input
                  type="text"
                  name="timeSlotId"
                  value={timeSlotId}
                  onChange={handleTimeSlotIdChange}
                  required
                />
              </div>
              <button type="submit" className="cancel-btn">Cancel Time Slot</button>
            </form>
          </div>
        );
      default:
        return <div className="content-card">Select a section from the sidebar.</div>;
    }
  };
 
  return (
    <div className="doctor-dashboard">
      <div className="sidebar">
        <div className="avatar"></div>
 
        <ul>
          <li onClick={() => setActiveSection('dashboard')}>Dashboard</li>
          <li onClick={() => setActiveSection('appointments')}>Appointments</li>
          <li onClick={() => setActiveSection('update-time-slots')}>Update Time Slots</li>
          <li onClick={() => setActiveSection('review-time-slots')}>Review Time Slots</li>
          <li onClick={() => setActiveSection('cancel-time-slots')}>Cancel Time Slots</li>
        </ul>
 
        <button className="logout-button">Logout</button>
      </div>
 
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}
 
export default DoctorDashboard;
 
 