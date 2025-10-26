import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';
import Header from '../Header/Header';
import '../assets/style.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="contact-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Contact Us</h1>
              <p className="hero-description">
                Have questions? We'd love to hear from you. Send us a message 
                and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: 'var(--spacing-2xl) 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 'var(--spacing-2xl)',
            alignItems: 'start'
          }}>
            
            {/* Contact Information */}
            <div>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '600', 
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--text-primary)'
              }}>
                Get in Touch
              </h2>
              <p style={{ 
                color: 'var(--text-secondary)', 
                marginBottom: 'var(--spacing-xl)',
                lineHeight: '1.6'
              }}>
                We're here to help you find the perfect car dealer. Whether you have questions 
                about our platform, need assistance with reviews, or want to partner with us, 
                don't hesitate to reach out.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaPhone />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Phone</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Email</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>support@cardealership.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Address</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                      123 Business Ave<br />
                      Suite 100<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ margin: 0 }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--text-primary)'
              }}>
                Send us a Message
              </h3>

              {submitted ? (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-xl)',
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #10b981',
                  borderRadius: 'var(--border-radius-md)',
                  color: '#065f46'
                }}>
                  <FaPaperPlane style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }} />
                  <h4>Message Sent!</h4>
                  <p>Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <FaUser className="label-icon" />
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <FaEnvelope className="label-icon" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      <FaComment className="label-icon" />
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      <FaComment className="label-icon" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      rows={5}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" style={{ marginRight: 'var(--spacing-xs)' }}></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;