import React from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form>
        <label>Email:</label>
        <input type="email" required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;