import React, { useState } from "react";
import {
  FaCar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import "../assets/style.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem("username");
      sessionStorage.removeItem("username");
      window.location.href = window.location.origin;
      window.location.reload();
      // Replace alert with better UX
      console.log("Logging out " + username + "...");
    } else {
      console.error("The user could not be logged out.");
    }
  };

  // Get the username in the current session
  let curr_user = sessionStorage.getItem("username");
  let home_page_items = null;

  // If the user is logged in, show the username and logout option
  if (curr_user !== null && curr_user !== "") {
    home_page_items = (
      <div
        className="input_panel"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-md)",
        }}
      >
        <span
          className="username"
          style={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Welcome, {curr_user}
        </span>
        <button className="btn btn-secondary" onClick={logout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    );
  } else {
    // If user is not logged in, show login and register buttons
    home_page_items = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-sm)",
        }}
      >
        <a
          href="/login"
          className="btn btn-outline"
          style={{
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.3)",
            textDecoration: "none",
          }}
        >
          <FaSignInAlt />
          Login
        </a>
        <a
          href="/register"
          className="btn btn-secondary"
          style={{
            textDecoration: "none",
          }}
        >
          <FaUserPlus />
          Register
        </a>
      </div>
    );
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      style={{
        background: "var(--gradient-primary)",
        boxShadow: "var(--shadow-lg)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <nav
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "var(--spacing-lg) var(--spacing-md)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-sm)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "var(--spacing-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaCar
              style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
            />
          </div>
          <h1
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "700",
              margin: 0,
            }}
          >
            CarDealership
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div
          className="navitems"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-lg)",
          }}
        >
          <a
            className="nav_item"
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Home
          </a>
          <a
            className="nav_item"
            href="/dealers"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Dealers
          </a>
          <a
            className="nav_item"
            href="/about"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              transition: "all 0.2s ease-in-out",
            }}
          >
            About
          </a>
          <a
            className="nav_item"
            href="/contact"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Contact
          </a>
        </div>

        {/* User Actions */}
        <div className="loginlink">{home_page_items}</div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "1.25rem",
            cursor: "pointer",
            padding: "var(--spacing-xs)",
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          style={{
            backgroundColor: "var(--primary-dark)",
            padding: "var(--spacing-md)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-md)",
            }}
          >
            <a
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "var(--spacing-sm)",
                borderRadius: "var(--border-radius-sm)",
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              Home
            </a>
            <a
              href="/dealers"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "var(--spacing-sm)",
                borderRadius: "var(--border-radius-sm)",
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              Dealers
            </a>
            <a
              href="/about"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "var(--spacing-sm)",
                borderRadius: "var(--border-radius-sm)",
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              About
            </a>
            <a
              href="/contact"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "var(--spacing-sm)",
                borderRadius: "var(--border-radius-sm)",
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              Contact
            </a>
            {/* Authentication Links for Mobile */}
            <div
              style={{
                marginTop: "var(--spacing-md)",
                paddingTop: "var(--spacing-md)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {curr_user ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-sm)",
                  }}
                >
                  <span style={{ color: "white", fontWeight: "500" }}>
                    Welcome, {curr_user}
                  </span>
                  <button
                    className="btn btn-secondary"
                    onClick={logout}
                    style={{ alignSelf: "flex-start" }}
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-sm)",
                  }}
                >
                  <a
                    href="/login"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      padding: "var(--spacing-sm)",
                      borderRadius: "var(--border-radius-sm)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      textAlign: "center",
                    }}
                  >
                    <FaSignInAlt style={{ marginRight: "var(--spacing-xs)" }} />
                    Login
                  </a>
                  <a
                    href="/register"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      padding: "var(--spacing-sm)",
                      borderRadius: "var(--border-radius-sm)",
                      background: "var(--gradient-secondary)",
                      textAlign: "center",
                    }}
                  >
                    <FaUserPlus style={{ marginRight: "var(--spacing-xs)" }} />
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .navitems {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .loginlink {
            display: none;
          }
        }
        .nav_item:hover {
          color: var(--accent-color) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </header>
  );
};

export default Header;
