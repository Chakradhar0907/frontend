import React, { useEffect, useState } from 'react';
import './Notification.css';

function Notification({ userType }) {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications based on user type (patient or doctor)
  useEffect(() => {
    const endpoint =
      userType === 'doctor'
        ? 'http://your-backend-url/api/doctor/notifications'
        : 'http://your-backend-url/api/patient/notifications';

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error('Error fetching notifications:', error));
  }, [userType]);

  return (
    <div className="notification-container">
      <h3>{userType === 'doctor' ? 'Doctor Notifications' : 'Patient Notifications'}</h3>
      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map((notification, index) => (
            <li key={index} className={`notification-item ${notification.type}`}>
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications found.</p>
      )}
    </div>
  );
}

export default Notification;