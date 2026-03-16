import React, { useMemo, useState } from "react";
import "./App.css";

/**
 * Minimal email validation for client-side feedback.
 * Kept intentionally simple (doesn't try to fully validate all RFC edge cases).
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

// PUBLIC_INTERFACE
function App() {
  /** Single-page navigation items. */
  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const [activeSection, setActiveSection] = useState("home");

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = useMemo(() => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    return next;
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  // PUBLIC_INTERFACE
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Keep state in sync for accessibility styling
    setActiveSection(id);

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onChangeField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // If user changes after submit, remove success banner to encourage resubmit.
    if (isSubmitted) setIsSubmitted(false);
  };

  const onBlurField = (key) => setTouched((prev) => ({ ...prev, [key]: true }));

  const onSubmit = (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });

    if (!isFormValid) return;

    // No backend requested for this work item; show a success state.
    setIsSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
  };

  return (
    <div className="App">
      <a className="skipLink" href="#home">
        Skip to content
      </a>

      <header className="siteHeader" aria-label="Site header">
        <div className="container headerInner">
          <div className="brand" aria-label="Brand">
            <span className="brandMark" aria-hidden="true" />
            <span className="brandText">ModernSite</span>
          </div>

          <nav className="nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`navLink ${activeSection === item.id ? "isActive" : ""}`}
                onClick={() => scrollToSection(item.id)}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="siteMain">
        <section id="home" className="section hero" aria-label="Home section">
          <div className="container heroGrid">
            <div className="heroCopy">
              <p className="eyebrow">Light, modern, responsive</p>
              <h1 className="heroTitle">A simple website that feels polished.</h1>
              <p className="heroSubtitle">
                Clean typography, thoughtful spacing, and a contact form that works—all in a single page.
              </p>

              <div className="heroCtas">
                <button type="button" className="btn btnPrimary" onClick={() => scrollToSection("contact")}>
                  Get in touch
                </button>
                <button type="button" className="btn btnGhost" onClick={() => scrollToSection("about")}>
                  Learn more
                </button>
              </div>

              <dl className="statRow" aria-label="Highlights">
                <div className="stat">
                  <dt className="statLabel">Layout</dt>
                  <dd className="statValue">Responsive</dd>
                </div>
                <div className="stat">
                  <dt className="statLabel">Style</dt>
                  <dd className="statValue">Modern</dd>
                </div>
                <div className="stat">
                  <dt className="statLabel">Sections</dt>
                  <dd className="statValue">Home · About · Contact</dd>
                </div>
              </dl>
            </div>

            <div className="heroCard" aria-label="Feature preview">
              <div className="card">
                <div className="cardHeader">
                  <span className="chip chipPrimary">Primary</span>
                  <span className="chip chipSuccess">Accent</span>
                </div>

                <h2 className="cardTitle">Designed for clarity</h2>
                <p className="cardText">
                  A bright surface on a soft background, with blue and teal accents per the style guide.
                </p>

                <ul className="featureList" aria-label="Key features">
                  <li>Sticky header navigation</li>
                  <li>Accessible section structure</li>
                  <li>Contact form with validation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section" aria-label="About section">
          <div className="container">
            <div className="sectionHeader">
              <h2 className="sectionTitle">About</h2>
              <p className="sectionLead">
                This is a minimal React single-page site with a clean modern look and a responsive layout.
              </p>
            </div>

            <div className="aboutGrid">
              <article className="surface">
                <h3 className="surfaceTitle">Purpose</h3>
                <p className="surfaceText">
                  Provide a simple website foundation: a home section for a clear first impression, an about section for
                  context, and a contact form for reaching out.
                </p>
              </article>

              <article className="surface">
                <h3 className="surfaceTitle">Design</h3>
                <p className="surfaceText">
                  Light theme, modern spacing, and a subtle gradient glow using a primary blue and teal accent.
                </p>
              </article>

              <article className="surface">
                <h3 className="surfaceTitle">Implementation</h3>
                <p className="surfaceText">
                  Vanilla CSS (no UI framework), semantic HTML, and straightforward React state handling.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section sectionAlt" aria-label="Contact section">
          <div className="container">
            <div className="sectionHeader">
              <h2 className="sectionTitle">Contact</h2>
              <p className="sectionLead">Send a quick message. Fields are validated locally for a smooth experience.</p>
            </div>

            <div className="contactGrid">
              <div className="surface contactInfo" aria-label="Contact details">
                <h3 className="surfaceTitle">What happens next?</h3>
                <p className="surfaceText">
                  This demo form does not send data to a backend (none requested). On submit, you’ll see a success
                  message, and the form resets.
                </p>

                <div className="callout">
                  <p className="calloutTitle">Tip</p>
                  <p className="calloutText">
                    Use the navigation to jump between sections, or the “Get in touch” button above.
                  </p>
                </div>
              </div>

              <form className="surface form" onSubmit={onSubmit} aria-label="Contact form">
                {isSubmitted && (
                  <div className="alertSuccess" role="status" aria-live="polite">
                    Thanks! Your message was received (demo).
                  </div>
                )}

                <div className="field">
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className={`input ${touched.name && errors.name ? "isInvalid" : ""}`}
                    value={form.name}
                    onChange={(e) => onChangeField("name", e.target.value)}
                    onBlur={() => onBlurField("name")}
                    autoComplete="name"
                    placeholder="Jane Doe"
                    aria-invalid={touched.name && Boolean(errors.name)}
                    aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  />
                  {touched.name && errors.name && (
                    <p id="name-error" className="errorText" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`input ${touched.email && errors.email ? "isInvalid" : ""}`}
                    value={form.email}
                    onChange={(e) => onChangeField("email", e.target.value)}
                    onBlur={() => onBlurField("email")}
                    autoComplete="email"
                    placeholder="jane@example.com"
                    aria-invalid={touched.email && Boolean(errors.email)}
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                  />
                  {touched.email && errors.email && (
                    <p id="email-error" className="errorText" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`textarea ${touched.message && errors.message ? "isInvalid" : ""}`}
                    value={form.message}
                    onChange={(e) => onChangeField("message", e.target.value)}
                    onBlur={() => onBlurField("message")}
                    rows={5}
                    placeholder="How can we help?"
                    aria-invalid={touched.message && Boolean(errors.message)}
                    aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                  />
                  {touched.message && errors.message && (
                    <p id="message-error" className="errorText" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="formActions">
                  <button type="submit" className="btn btnPrimary" disabled={!isFormValid}>
                    Send message
                  </button>
                  <p className="formHint" aria-label="Form hint">
                    All fields are required.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter" aria-label="Site footer">
        <div className="container footerInner">
          <p className="footerText">© {new Date().getFullYear()} ModernSite. Built with React.</p>
          <button type="button" className="backToTop" onClick={() => scrollToSection("home")}>
            Back to top
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
