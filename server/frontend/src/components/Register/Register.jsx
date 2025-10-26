import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaTimes, FaUserPlus } from 'react-icons/fa';
import Header from '../Header/Header';
import "../assets/style.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to home
  const goHome = () => {
    window.location.href = window.location.origin;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userName.trim()) {
      newErrors.userName = "Username is required";
    } else if (userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    }
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    let register_url = "http://127.0.0.1:8000/djangoapp/registration";

    try {
      // Send POST request to register endpoint
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
        }),
      });

      const json = await res.json();
      if (json.status === "Authenticated") {
        // Save username in session and redirect to home
        sessionStorage.setItem("username", json.userName);
        window.location.href = window.location.origin;
      } else if (json.error) {
        setErrors({ general: json.error });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background-color)',
      padding: 'var(--spacing-md)'
    }}>
      <Header />
      <div style={{
        maxWidth: '500px',
        margin: 'var(--spacing-2xl) auto',
        backgroundColor: 'var(--surface-color)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
          color: 'white',
          padding: 'var(--spacing-xl)',
          textAlign: 'center',
          position: 'relative'
        }}>
          <button
            onClick={goHome}
            style={{
              position: 'absolute',
              top: 'var(--spacing-md)',
              right: 'var(--spacing-md)',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: 'var(--spacing-xs)',
              borderRadius: '50%',
              transition: 'background-color 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <FaTimes />
          </button>
          <FaUserPlus style={{
            fontSize: '3rem',
            marginBottom: 'var(--spacing-md)',
            opacity: 0.9
          }} />
          <h2 style={{
            margin: 0,
            fontSize: '1.75rem',
            fontWeight: '700'
          }}>
            Create Account
          </h2>
          <p style={{
            margin: 'var(--spacing-xs) 0 0 0',
            opacity: 0.9,
            fontSize: '0.875rem'
          }}>
            Join our car dealership community
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: 'var(--spacing-xl)' }}>
          {/* Error Message */}
          {errors.general && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--border-radius-md)',
              marginBottom: 'var(--spacing-lg)',
              fontSize: '0.875rem',
              border: '1px solid #fecaca'
            }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleRegister}>
            {/* Username Field */}
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label
                htmlFor="username"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-xs)'
                }}
              >
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <FaUser style={{
                  position: 'absolute',
                  left: 'var(--spacing-md)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem'
                }} />
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md) var(--spacing-md) var(--spacing-md) 2.5rem',
                    border: `1px solid ${errors.userName ? '#dc2626' : 'var(--border-color)'}`,
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--surface-color)',
                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.userName ? '#dc2626' : 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {errors.userName && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.75rem',
                  margin: 'var(--spacing-xs) 0 0 0'
                }}>
                  {errors.userName}
                </p>
              )}
            </div>

            {/* Name Fields */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--spacing-xs)'
                  }}
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: `1px solid ${errors.firstName ? '#dc2626' : 'var(--border-color)'}`,
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--surface-color)',
                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.firstName ? '#dc2626' : 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.firstName && (
                  <p style={{
                    color: '#dc2626',
                    fontSize: '0.75rem',
                    margin: 'var(--spacing-xs) 0 0 0'
                  }}>
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--spacing-xs)'
                  }}
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: `1px solid ${errors.lastName ? '#dc2626' : 'var(--border-color)'}`,
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--surface-color)',
                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.lastName ? '#dc2626' : 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.lastName && (
                  <p style={{
                    color: '#dc2626',
                    fontSize: '0.75rem',
                    margin: 'var(--spacing-xs) 0 0 0'
                  }}>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-xs)'
                }}
              >
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={{
                  position: 'absolute',
                  left: 'var(--spacing-md)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem'
                }} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md) var(--spacing-md) var(--spacing-md) 2.5rem',
                    border: `1px solid ${errors.email ? '#dc2626' : 'var(--border-color)'}`,
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--surface-color)',
                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? '#dc2626' : 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {errors.email && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.75rem',
                  margin: 'var(--spacing-xs) 0 0 0'
                }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-xs)'
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <FaLock style={{
                  position: 'absolute',
                  left: 'var(--spacing-md)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem'
                }} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="psw"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md) 3rem var(--spacing-md) 2.5rem',
                    border: `1px solid ${errors.password ? '#dc2626' : 'var(--border-color)'}`,
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--surface-color)',
                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? '#dc2626' : 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 'var(--spacing-md)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    padding: 'var(--spacing-xs)'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.75rem',
                  margin: 'var(--spacing-xs) 0 0 0'
                }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                fontSize: '1rem',
                fontWeight: '600',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? (
                <>
                  <div className="spinner" style={{ marginRight: 'var(--spacing-xs)' }}></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus style={{ marginRight: 'var(--spacing-xs)' }} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              margin: 0
            }}>
              Already have an account?{' '}
              <a
                href="/login"
                style={{
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
