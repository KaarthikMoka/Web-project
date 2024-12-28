import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginSignup.css';

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleForm = () => {
    setMessage('');
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? '/signup' : '/login';
    const requestBody = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        if (!isSignup) {
          localStorage.setItem('token', data.token); // Save token on login
        }
        // Navigate to Home after successful sign-up or login
        setTimeout(() => navigate('/home'), 1500); // Redirect after 1.5 seconds
      } else {
        setMessage(data.error || 'An error occurred.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="video-container">
      <video className="background-video" autoPlay loop muted>
  <source src="/back.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
      </div>

      <div className="form-container">
        <h2 className="form-title">{isSignup ? 'Sign Up' : 'Log In'}</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="toggle-link" onClick={toggleForm}>
          {isSignup
            ? 'Already have an account? Log In'
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
