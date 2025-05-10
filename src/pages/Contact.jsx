import { useState, useEffect } from "react";
import "../style/Contact.css";
// Import icons if you're using a library like react-icons or font-awesome
// Example: import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Contact() {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    content: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Form validation
  useEffect(() => {
    const validateForm = () => {
      const errors = {};
      if (!message.name.trim()) errors.name = "Nama diperlukan";
      if (!message.email.trim()) {
        errors.email = "Email diperlukan";
      } else if (!/^\S+@\S+\.\S+$/.test(message.email)) {
        errors.email = "Format email tidak valid";
      }
      if (!message.content.trim()) errors.content = "Pesan diperlukan";
      
      setFormErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
    };
    
    validateForm();
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      // Highlight all errors to the user
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Replace with actual API call when ready
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(message)
      // });
      // if (!response.ok) throw new Error('Failed to send message');
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful submission
      setMessage({ name: "", email: "", phone: "", subject: "", content: "" });
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      // Show error message to user (you can add a state for this)
      // setErrorMessage("Gagal mengirim pesan. Silakan coba lagi nanti.");
    }
  };

  return (
    <div className="contact-container">
      {/* Header Section */}
      <div className="contact-header">
        <h1>Hubungi Kami</h1>
        <div className="header-divider"></div>
        <p>Tim layanan pelanggan kami siap memberikan pelayanan terbaik untuk Anda</p>
      </div>

      <div className="contact-content">
        {/* Contact Information */}
        <div className="contact-info">
          <div className="info-card">
            <h3>Informasi Kontak</h3>
            
            <div className="info-item">
              <div className="info-icon location-icon" aria-hidden="true">
                {/* Add your location icon here */}
              </div>
              <div>
                <h4>Alamat</h4>
                <address>
                  Jl.Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153
                </address>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon phone-icon" aria-hidden="true">
                {/* Add your phone icon here */}
              </div>
              <div>
                <h4>Telepon</h4>
                <p><a href="tel:+6281234567890">+62 812-3456-7890</a> (Reservasi)</p>
                <p><a href="tel:+6282156789012">+62 821-5678-9012</a> (Customer Service)</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon email-icon" aria-hidden="true">
                {/* Add your email icon here */}
              </div>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:reservasi@hotelcendana.com">reservasi@hotelcendana.com</a></p>
                <p><a href="mailto:info@hotelcendana.com">info@hotelcendana.com</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon time-icon" aria-hidden="true">
                {/* Add your time/clock icon here */}
              </div>
              <div>
                <h4>Jam Operasional</h4>
                <p>Check-in: 14:00 - 22:00</p>
                <p>Check-out: 12:00</p>
                <p>Resepsionis: 24 Jam</p>
              </div>
            </div>

            <div className="social-media">
              <h4>Ikuti Kami</h4>
              <div className="social-icons">
                <a href="#" className="social-icon facebook-icon" aria-label="Facebook">
                  {/* Add your Facebook icon here */}
                </a>
                <a href="#" className="social-icon instagram-icon" aria-label="Instagram">
                  {/* Add your Instagram icon here */}
                </a>
                <a href="#" className="social-icon twitter-icon" aria-label="Twitter">
                  {/* Add your Twitter icon here */}
                </a>
                <a href="#" className="social-icon linkedin-icon" aria-label="LinkedIn">
                  {/* Add your LinkedIn icon here */}
                </a>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-card">
            <div className="map-icon" aria-hidden="true">
              {/* Add your map icon here */}
            </div>
            <h4>Lokasi Hotel</h4>
            <address>
              Jl.Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153
            </address>
            <a href="https://maps.google.com/?q=Jl.Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="direction-button">
              <span className="direction-icon" aria-hidden="true"></span>
              Petunjuk Arah
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-wrapper">
          <div className="form-card">
            <h3>Kirim Pesan</h3>
            
            {showSuccess && (
              <div className="success-message" role="alert">
                <span className="success-icon" aria-hidden="true">✓</span>
                <div>
                  <h4>Pesan Terkirim!</h4>
                  <p>Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda.</p>
                </div>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nama Lengkap<span className="required">*</span></label>
                  <div className="input-with-icon">
                    <span className="input-icon user-icon" aria-hidden="true"></span>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={message.name}
                      placeholder="Masukkan nama lengkap"
                      onChange={handleChange}
                      className={formErrors.name ? "error" : ""}
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      autoComplete="name"
                    />
                    {formErrors.name && <span className="error-message" role="alert">{formErrors.name}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Alamat Email<span className="required">*</span></label>
                  <div className="input-with-icon">
                    <span className="input-icon email-icon" aria-hidden="true"></span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={message.email}
                      placeholder="email@example.com"
                      onChange={handleChange}
                      className={formErrors.email ? "error" : ""}
                      aria-required="true"
                      aria-invalid={!!formErrors.email}
                      autoComplete="email"
                    />
                    {formErrors.email && <span className="error-message" role="alert">{formErrors.email}</span>}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Nomor Telepon</label>
                  <div className="input-with-icon">
                    <span className="input-icon phone-icon" aria-hidden="true"></span>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={message.phone}
                      placeholder="+62 8xx-xxxx-xxxx"
                      onChange={handleChange}
                      autoComplete="tel"
                      pattern="[0-9+\-\s]+"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subjek</label>
                  <div className="input-with-icon">
                    <span className="input-icon subject-icon" aria-hidden="true"></span>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={message.subject}
                      placeholder="Subjek pesan Anda"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="content">Pesan<span className="required">*</span></label>
                <div className="input-with-icon">
                  <span className="input-icon message-icon" aria-hidden="true"></span>
                  <textarea
                    id="content"
                    name="content"
                    value={message.content}
                    rows="5"
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    onChange={handleChange}
                    className={formErrors.content ? "error" : ""}
                    aria-required="true"
                    aria-invalid={!!formErrors.content}
                  ></textarea>
                  {formErrors.content && <span className="error-message" role="alert">{formErrors.content}</span>}
                </div>
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={isSubmitting ? "submit-button loading" : "submit-button"}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner" aria-hidden="true"></span>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <span className="send-icon" aria-hidden="true"></span>
                      Kirim Pesan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;