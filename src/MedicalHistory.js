import React, { useState, useEffect } from "react";

const MedicalHistory = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Authentication required. Please log in.");
          return;
        }

        const response = await fetch("https://localhost:7263/api/MedicalHistory", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch medical history");

        const data = await response.json();
        setMedicalHistory(data);
      } catch (error) {
        setMessage("Error fetching medical history: " + error.message);
      }
    };

    fetchMedicalHistory();
  }, []);

  return (
    <div className="medical-history-container">
      <h2>Your Medical History</h2>
      {message && <p className="message">{message}</p>}
      {medicalHistory.length > 0 ? (
        <ul>
          {medicalHistory.map((record, index) => (
            <li key={index}>
              <p>Doctor: {record.doctorName}</p>
              <p>Date of Visit: {record.dateOfVisit}</p>
              <p>Treatment: {record.treatmentTaken}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No medical history found.</p>
      )}
    </div>
  );
};

export default MedicalHistory;