import React, { useState } from 'react';
import './login.css';

function Login({ onLogin, isDarkMode, toggleDarkMode }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Demo credentials for testing
  const DEMO_CREDENTIALS = {
    email: 'demo@igdtuw.ac.in',
    password: 'demo123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isSignUp) {
        // Sign up logic - auto login after signup
        const userData = {
          name: formData.name,
          email: formData.email,
          skills: [],
          interests: [],
          role: 'student'
        };
        onLogin(userData);
      } else {
        // Login logic
        if (
          formData.email === DEMO_CREDENTIALS.email &&
          formData.password === DEMO_CREDENTIALS.password
        ) {
          const userData = {
            name: 'Demo User',
            email: formData.email,
            skills: ['AI/ML', 'Web Development', 'IoT'],
            interests: ['Robotics', 'Blockchain', 'AR/VR'],
            role: 'student'
          };
          onLogin(userData);
        } else {
          setErrors({ form: 'Invalid email or password. Try demo@igdtuw.ac.in / demo123' });
          setLoading(false);
        }
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const userData = {
        name: 'Demo User',
        email: DEMO_CREDENTIALS.email,
        skills: ['AI/ML', 'Web Development', 'IoT'],
        interests: ['Robotics', 'Blockchain', 'AR/VR'],
        role: 'student'
      };
      onLogin(userData);
    }, 800);
  };

  return (
    <div className={`login-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div className="login-bg">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>
        <div className="planet planet-3"></div>
      </div>

      {/* Dark Mode Toggle */}
      <button
        className="theme-toggle"
        onClick={toggleDarkMode}
        title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Login Card */}
      <div className="login-card">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-icon">🌌</div>
            <h1>IEEE IGDTUW MetaCampus</h1>
            <p className="tagline">Indira Gandhi Delhi Technical University for Women</p>
          </div>
        </div>

        <div className="login-body">
          <div className="tabs">
            <button
              className={`tab ${!isSignUp ? 'active' : ''}`}
              onClick={() => {
                setIsSignUp(false);
                setErrors({});
                setFormData({ email: '', password: '', name: '', confirmPassword: '' });
              }}
            >
              Login
            </button>
            <button
              className={`tab ${isSignUp ? 'active' : ''}`}
              onClick={() => {
                setIsSignUp(true);
                setErrors({});
                setFormData({ email: '', password: '', name: '', confirmPassword: '' });
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.form && (
              <div className="error-message form-error">
                {errors.form}
              </div>
            )}

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@igdtuw.ac.in"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {!isSignUp && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            className="demo-btn"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            <span className="demo-icon">🚀</span>
            Try Demo Account
          </button>

          <div className="demo-credentials">
            <p>
              <strong>Demo Credentials:</strong>
            </p>
            <p>Email: demo@igdtuw.ac.in</p>
            <p>Password: demo123</p>
          </div>
        </div>

        <div className="login-footer">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              className="link-btn"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
                setFormData({ email: '', password: '', name: '', confirmPassword: '' });
              }}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>

      <div className="login-info">
        <div className="info-card">
          <div className="info-icon">🤖</div>
          <h3>AI-Powered Matching</h3>
          <p>Smart recommendations for IEEE IGDTUW events</p>
        </div>
        <div className="info-card">
          <div className="info-icon">🗺️</div>
          <h3>AR Campus Navigation</h3>
          <p>Navigate IGDTUW with augmented reality</p>
        </div>
        <div className="info-card">
          <div className="info-icon">🎨</div>
          <h3>Blockchain NFT Certificates</h3>
          <p>Verifiable IEEE IGDTUW achievements</p>
        </div>
      </div>
    </div>
  );
}

export default Login;