import { useState, useEffect } from "react";

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
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage({ name: "", email: "", phone: "", subject: "", content: "" });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Hubungi Kami</h1>
          <div className="mx-auto mb-2" style={{width:'60px',height:'4px',background:'#0d6efd',borderRadius:'2px'}}></div>
          <p className="lead text-muted">Tim layanan pelanggan kami siap memberikan pelayanan terbaik untuk Anda</p>
        </div>
        <div className="row g-4 align-items-stretch">
          {/* Contact Information */}
          <div className="col-lg-5 d-flex">
            <div className="card shadow-sm mb-4 w-100 h-100">
              <div className="card-body">
                <h3 className="h5 fw-bold mb-4"><i className="bi bi-info-circle-fill text-primary me-2"></i>Informasi Kontak</h3>
                <div className="mb-4 d-flex align-items-start">
                  <i className="bi bi-geo-alt-fill fs-4 text-success me-3"></i>
                  <div>
                    <h4 className="h6 mb-1 fw-bold">Alamat</h4>
                    <address className="mb-0 text-muted small">
                      Jl.Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153
                    </address>
                  </div>
                </div>
                <div className="mb-4 d-flex align-items-start">
                  <i className="bi bi-telephone-fill fs-4 text-info me-3"></i>
                  <div>
                    <h4 className="h6 mb-1 fw-bold">Telepon</h4>
                    <p className="mb-0 small"><a href="tel:+6281234567890" className="text-decoration-none text-dark"><i className="bi bi-telephone me-1"></i>+62 812-3456-7890</a> <span className="text-muted">(Reservasi)</span></p>
                    <p className="mb-0 small"><a href="tel:+6282156789012" className="text-decoration-none text-dark"><i className="bi bi-telephone me-1"></i>+62 821-5678-9012</a> <span className="text-muted">(Customer Service)</span></p>
                  </div>
                </div>
                <div className="mb-4 d-flex align-items-start">
                  <i className="bi bi-envelope-fill fs-4 text-warning me-3"></i>
                  <div>
                    <h4 className="h6 mb-1 fw-bold">Email</h4>
                    <p className="mb-0 small"><a href="mailto:reservasi@hotelcendana.com" className="text-decoration-none text-dark"><i className="bi bi-envelope me-1"></i>reservasi@hotelcendana.com</a></p>
                    <p className="mb-0 small"><a href="mailto:info@hotelcendana.com" className="text-decoration-none text-dark"><i className="bi bi-envelope me-1"></i>info@hotelcendana.com</a></p>
                  </div>
                </div>
                <div className="mb-4 d-flex align-items-start">
                  <i className="bi bi-clock-fill fs-4 text-danger me-3"></i>
                  <div>
                    <h4 className="h6 mb-1 fw-bold">Jam Operasional</h4>
                    <p className="mb-0 small">Check-in: 14:00 - 22:00</p>
                    <p className="mb-0 small">Check-out: 12:00</p>
                    <p className="mb-0 small">Resepsionis: 24 Jam</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="h6 mb-2 fw-bold"><i className="bi bi-share-fill text-primary me-2"></i>Ikuti Kami</h4>
                  <div className="d-flex gap-2">
                    <a href="#" className="btn btn-outline-primary btn-sm rounded-circle" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="btn btn-outline-danger btn-sm rounded-circle" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="btn btn-outline-info btn-sm rounded-circle" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="btn btn-outline-primary btn-sm rounded-circle" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
                <div className="mb-2 d-flex align-items-start">
                  <i className="bi bi-geo-alt fs-4 text-success me-3"></i>
                  <div>
                    <h4 className="h6 mb-1 fw-bold">Lokasi Hotel</h4>
                    <address className="mb-2 text-muted small">
                      Jl.Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153
                    </address>
                    <a href="https://maps.google.com/?q=Jl.Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success btn-sm">
                      <i className="bi bi-geo-alt me-1"></i>Petunjuk Arah
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="col-lg-7 d-flex">
            <div className="card shadow-sm w-100 h-100">
              <div className="card-body">
                <h3 className="h5 fw-bold mb-3">Kirim Pesan</h3>
                {showSuccess && (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <div>
                      <h4 className="h6 mb-1">Pesan Terkirim!</h4>
                      <p className="mb-0 small">Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda.</p>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        <i className="bi bi-person me-2"></i>Nama Lengkap<span className="text-danger">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={message.name}
                        placeholder="Masukkan nama lengkap"
                        onChange={handleChange}
                        className={`form-control${formErrors.name ? " is-invalid" : ""}`}
                        aria-required="true"
                        aria-invalid={!!formErrors.name}
                        autoComplete="name"
                      />
                      {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        <i className="bi bi-envelope me-2"></i>Alamat Email<span className="text-danger">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={message.email}
                        placeholder="email@example.com"
                        onChange={handleChange}
                        className={`form-control${formErrors.email ? " is-invalid" : ""}`}
                        aria-required="true"
                        aria-invalid={!!formErrors.email}
                        autoComplete="email"
                      />
                      {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                    </div>
                  </div>
                  <div className="row g-3 mt-1">
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">
                        <i className="bi bi-telephone me-2"></i>Nomor Telepon
                      </label>
                      <input
                        id="phone"
                        type="text"
                        name="phone"
                        value={message.phone}
                        placeholder="08xxxxxxxxxx"
                        onChange={handleChange}
                        className="form-control"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label">
                        <i className="bi bi-chat-left-text me-2"></i>Subjek
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={message.subject}
                        placeholder="Subjek pesan"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="content" className="form-label">
                      <i className="bi bi-chat-dots me-2"></i>Pesan<span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={message.content}
                      placeholder="Tulis pesan Anda di sini..."
                      onChange={handleChange}
                      className={`form-control${formErrors.content ? " is-invalid" : ""}`}
                      rows={5}
                      aria-required="true"
                      aria-invalid={!!formErrors.content}
                    />
                    {formErrors.content && <div className="invalid-feedback">{formErrors.content}</div>}
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-primary btn-lg fw-bold px-5" disabled={isSubmitting}>
                      {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;