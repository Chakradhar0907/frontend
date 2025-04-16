import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    patientName: "",
    email: "",
    contactNumber: "",
  });
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [message, setMessage] = useState("");

  // Fetch patient details from the backend
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("Authentication required. Please log in.");
          return;
        }

        const response = await fetch("https://localhost:7263/api/PatientRegistration", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch patient details");

        const data = await response.json();
        setPatientDetails(data);
        setUpdatedName(data.patientName);
        setUpdatedPhone(data.contactNumber);
      } catch (error) {
        setMessage("Error fetching patient details: " + error.message);
      }
    };

    fetchPatientDetails();
  }, []);

  // Handle save changes
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authentication required. Please log in.");
        return;
      }

      const response = await fetch("https://localhost:7263/api/PatientRegistration", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientName: updatedName,
          contactNumber: updatedPhone,
        }),
      });

      if (!response.ok) throw new Error("Failed to update patient details");

      setPatientDetails((prevDetails) => ({
        ...prevDetails,
        patientName: updatedName,
        contactNumber: updatedPhone,
      }));
      setIsEditing(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="profile-container">
      <h3>Profile</h3>
      {message && <p className="message">{message}</p>}
      <form>
        {/* Name Field */}
        <div className="form-group">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          ) : (
            <p>{patientDetails.patientName || "Loading..."}</p>
          )}
        </div>

        {/* Email Field (Fixed) */}
        <div className="form-group">
          <label>Email:</label>
          <p>{patientDetails.email || "Loading..."}</p>
        </div>

        {/* Phone Number Field */}
        <div className="form-group">
          <label>Phone Number:</label>
          {isEditing ? (
            <input
              type="text"
              value={updatedPhone}
              onChange={(e) => setUpdatedPhone(e.target.value)}
            />
          ) : (
            <p>{patientDetails.contactNumber || "Loading..."}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="button-group">
          {isEditing ? (
            <>
              <button
                type="button"
                className="save-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;