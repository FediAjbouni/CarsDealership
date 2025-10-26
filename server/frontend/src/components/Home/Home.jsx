import { Link } from 'react-router-dom';
import { FaCar, FaStar, FaUsers, FaMapMarkerAlt, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import Header from '../Header/Header';
import './Home.css';

const Home = () => {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('username') !== null;
  const username = sessionStorage.getItem('username');
  
  const features = [
    {
      icon: <FaCar />,
      title: "Wide Selection",
      description: "Browse through hundreds of verified car dealers in your area"
    },
    {
      icon: <FaStar />,
      title: "Verified Reviews",
      description: "Read authentic reviews from real customers to make informed decisions"
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Dealers",
      description: "All dealers are verified and committed to quality service"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Local & Nationwide",
      description: "Find dealers near you or explore options across the country"
    }
  ];

  const stats = [
    { number: "500+", label: "Verified Dealers" },
    { number: "10K+", label: "Happy Customers" },
    { number: "50+", label: "States Covered" },
    { number: "4.8", label: "Average Rating" }
  ];

  return (
    <div className="home-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="container">
            <div className="hero-layout">
              <div className="hero-content">
                <h1 className="hero-title">
                  {isLoggedIn ? (
                    <>Welcome back, <span className="highlight">{username}</span>!</>
                  ) : (
                    <>Find Your Perfect<span className="highlight"> Car Dealer</span></>
                  )}
                </h1>
                <p className="hero-description">
                  {isLoggedIn ? (
                    "Ready to explore dealerships and share your experiences? Browse our verified dealers and help others make informed decisions."
                  ) : (
                    "Discover trusted car dealerships with verified reviews and ratings. Make informed decisions with real customer experiences."
                  )}
                </p>
                <div className="hero-actions">
                  <Link to="/dealers" className="btn btn-primary btn-large">
                    <FaCar />
                    Browse Dealers
                    <FaArrowRight />
                  </Link>
                  {!isLoggedIn ? (
                    <Link to="/register" className="btn btn-secondary btn-large">
                      <FaUsers />
                      Join Community
                    </Link>
                  ) : (
                    <Link to="/dealers" className="btn btn-secondary btn-large">
                      <FaStar />
                      Write Reviews
                    </Link>
                  )}
                </div>
              </div>
              <div className="hero-image">
                <div className="hero-card">
                  <FaCar className="hero-card-icon" />
                  <h3>Premium Experience</h3>
                  <p>Quality dealers, verified reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose CarDealership?</h2>
            <p className="section-description">
              We connect you with the best car dealers through a trusted platform
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            {isLoggedIn ? (
              <>
                <h2 className="cta-title">Share Your Experience</h2>
                <p className="cta-description">
                  Help other car buyers by sharing your dealership experiences and reading authentic reviews
                </p>
                <div className="cta-actions">
                  <Link to="/dealers" className="btn btn-primary btn-large">
                    <FaStar />
                    Write a Review
                    <FaArrowRight />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="cta-title">Ready to Find Your Next Car?</h2>
                <p className="cta-description">
                  Join thousands of satisfied customers who found their perfect dealer through our platform
                </p>
                <div className="cta-actions">
                  <Link to="/dealers" className="btn btn-primary btn-large">
                    Get Started Now
                    <FaArrowRight />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <FaCar />
                <span>CarDealership</span>
              </div>
              <p>Connecting you with trusted car dealers nationwide</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                <Link to="/dealers">Browse Dealers</Link>
                <Link to="/register">Join Us</Link>
                <Link to="/login">Sign In</Link>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="/help">Help Center</a>
                <a href="/contact">Contact Us</a>
                <a href="/about">About</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 CarDealership. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;