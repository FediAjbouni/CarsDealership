import { Link } from 'react-router-dom';
import { FaCar, FaUsers, FaShieldAlt, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Header from '../Header/Header';
import '../assets/style.css';

const About = () => {
  return (
    <div className="about-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">About CarDealership</h1>
              <p className="hero-description">
                Your trusted partner in finding the perfect car dealer. We connect customers 
                with verified dealerships nationwide through authentic reviews and ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section" style={{ padding: 'var(--spacing-2xl) 0' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-description">
              To revolutionize the car buying experience by providing transparency, 
              trust, and convenience in dealer selection.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3 className="feature-title">Trust & Transparency</h3>
              <p className="feature-description">
                All our dealers are verified and committed to providing honest, 
                transparent service to every customer.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaStar />
              </div>
              <h3 className="feature-title">Authentic Reviews</h3>
              <p className="feature-description">
                Real reviews from real customers help you make informed decisions 
                about your next car purchase.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3 className="feature-title">Community Driven</h3>
              <p className="feature-description">
                Our platform is powered by a community of car buyers sharing 
                their experiences to help others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Verified Dealers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">States Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Find Your Perfect Dealer?</h2>
            <p className="cta-description">
              Join thousands of satisfied customers who found their ideal car dealer through our platform.
            </p>
            <div className="cta-actions">
              <Link to="/dealers" className="btn btn-primary btn-large">
                <FaCar />
                Browse Dealers
              </Link>
              <Link to="/register" className="btn btn-secondary btn-large">
                <FaUsers />
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;