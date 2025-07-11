import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetRequest = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/request-reset', { email });
      toast.success('OTP sent to your email');
      navigate('/verify-otp'); 
    } catch (err) {
      toast.error('Failed to request OTP');
    }
  };

  return (
    <div className="auth-reset-container">
      <h2>Request OTP</h2>
      <form onSubmit={handleRequest}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default ResetRequest;
