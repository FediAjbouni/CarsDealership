import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import Header from "../Header/Header";
import "../assets/style.css";

const Login = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(true);

  let login_url = "http://127.0.0.1:8000/djangoapp/login";

  const validateForm = () => {
    const newErrors = {};
    if (!userName.trim()) {
      newErrors.userName = "Username is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });

      const json = await res.json();
      if (json.status != null && json.status === "Authenticated") {
        sessionStorage.setItem("username", json.userName);
        setOpen(false);
      } else {
        setErrors({ general: "Invalid username or password" });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!open) {
    window.location.href = "/";
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "var(--spacing-md)",
      }}
    >
      <Header />
      <div
        className="form_panel"
        style={{
          position: "relative",
          maxWidth: "400px",
          width: "100%",
          marginTop: "var(--spacing-xl)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "var(--spacing-md)",
            right: "var(--spacing-md)",
            background: "none",
            border: "none",
            fontSize: "1.25rem",
            cursor: "pointer",
            color: "var(--text-secondary)",
            padding: "var(--spacing-xs)",
            borderRadius: "50%",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "var(--background-color)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-xl)" }}>
          <h2
            style={{
              color: "var(--primary-color)",
              fontSize: "1.75rem",
              fontWeight: "700",
              margin: 0,
              marginBottom: "var(--spacing-xs)",
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              margin: 0,
              fontSize: "0.875rem",
            }}
          >
            Sign in to your account
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "var(--spacing-sm) var(--spacing-md)",
              borderRadius: "var(--border-radius-md)",
              marginBottom: "var(--spacing-lg)",
              fontSize: "0.875rem",
              border: "1px solid #fecaca",
            }}
          >
            {errors.general}
          </div>
        )}

        <form onSubmit={login}>
          {/* Username Field */}
          <div style={{ marginBottom: "var(--spacing-lg)" }}>
            <label
              htmlFor="username"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "var(--text-primary)",
                marginBottom: "var(--spacing-xs)",
              }}
            >
              Username
            </label>
            <div style={{ position: "relative" }}>
              <FaUser
                style={{
                  position: "absolute",
                  left: "var(--spacing-md)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                }}
              />
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{
                  width: "100%",
                  padding:
                    "var(--spacing-md) var(--spacing-md) var(--spacing-md) 2.5rem",
                  border: `1px solid ${
                    errors.userName ? "#dc2626" : "var(--border-color)"
                  }`,
                  borderRadius: "var(--border-radius-md)",
                  fontSize: "0.875rem",
                  backgroundColor: "var(--surface-color)",
                  transition:
                    "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary-color)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.userName
                    ? "#dc2626"
                    : "var(--border-color)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            {errors.userName && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "0.75rem",
                  margin: "var(--spacing-xs) 0 0 0",
                }}
              >
                {errors.userName}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "var(--spacing-xl)" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "var(--text-primary)",
                marginBottom: "var(--spacing-xs)",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <FaLock
                style={{
                  position: "absolute",
                  left: "var(--spacing-md)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                }}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="psw"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding:
                    "var(--spacing-md) var(--spacing-md) var(--spacing-md) 2.5rem",
                  border: `1px solid ${
                    errors.password ? "#dc2626" : "var(--border-color)"
                  }`,
                  borderRadius: "var(--border-radius-md)",
                  fontSize: "0.875rem",
                  backgroundColor: "var(--surface-color)",
                  transition:
                    "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary-color)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.password
                    ? "#dc2626"
                    : "var(--border-color)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "var(--spacing-md)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  padding: "var(--spacing-xs)",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "0.75rem",
                  margin: "var(--spacing-xs) 0 0 0",
                }}
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-md)",
              marginBottom: "var(--spacing-lg)",
            }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{
                flex: 1,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? (
                <>
                  <div
                    className="spinner"
                    style={{ marginRight: "var(--spacing-xs)" }}
                  ></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>

          {/* Register Link */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                margin: 0,
              }}
            >
              Don't have an account?{" "}
              <a
                href="/register"
                style={{
                  color: "var(--primary-color)",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Sign up here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
