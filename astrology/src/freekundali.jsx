import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFreeKundali, getUserProfile } from "./api/api";

const FreeKundali = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    gender: "male",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.user);
        if (res.user?.name) {
          setFormData((prev) => ({ ...prev, name: res.user.name }));
        }
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await getFreeKundali(formData);
      setResult(response.data);
    } catch (err) {
      setError("Failed to generate Kundali. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPlanetEmoji = (planet) => {
    const emojis = {
      Sun: "☀️",
      Moon: "🌙",
      Mars: "♂️",
      Mercury: "☿️",
      Jupiter: "♃",
      Venus: "♀️",
      Saturn: "♄",
      Rahu: "🐍",
      Ketu: "🔮",
    };
    return emojis[planet] || "⭐";
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <Link to="/dashboard" style={styles.logo}>
          ✨ JYOTISH URJA
        </Link>
        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.navLink}>HOME</Link>
          <Link to="/dashboard#services" style={styles.navLink}>SERVICES</Link>
          <Link to="/profile" style={styles.navLink}>PROFILE</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>📜 Free Kundali</h1>
        <p style={styles.heroDesc}>
          Generate your complete birth chart with detailed planetary positions and analysis
        </p>
      </section>

      {/* Form Section */}
      <section style={styles.formSection}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.formTitle}>Enter Your Birth Details</h3>
          
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Birth Time</label>
              <input
                type="time"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Birth Place</label>
              <input
                type="text"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleChange}
                placeholder="City, Country"
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Generating Kundali..." : "Generate Kundali 📜"}
          </button>
        </form>

        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {/* Result Section */}
        {result && (
          <div style={styles.resultSection}>
            <div style={styles.resultHeader}>
              <h2 style={styles.resultTitle}>🪐 Your Kundali</h2>
              <p style={styles.resultSubtitle}>
                {result.name} | {result.dob} | {result.birthTime} | {result.birthPlace}
              </p>
            </div>

            {/* Planetary Positions */}
            <div style={styles.planetsSection}>
              <h3 style={styles.sectionTitle}>Planetary Positions</h3>
              <div style={styles.planetsGrid}>
                {result.planets && typeof result.planets === 'object' && 
                  Object.entries(result.planets).map(([planet, data]) => (
                    <div key={planet} style={styles.planetCard}>
                      <span style={styles.planetEmoji}>{getPlanetEmoji(planet)}</span>
                      <h4 style={styles.planetName}>{planet}</h4>
                      {typeof data === 'object' ? (
                        <>
                          <p style={styles.planetInfo}>
                            Sign: {data.sign || data.zodiac || 'N/A'}
                          </p>
                          <p style={styles.planetDegree}>
                            {data.degree || data.fullDegree || 'N/A'}°
                          </p>
                        </>
                      ) : (
                        <p style={styles.planetInfo}>{String(data)}</p>
                      )}
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Info Cards */}
            <div style={styles.infoCards}>
              <div style={styles.infoCard}>
                <span style={styles.infoIcon}>🌟</span>
                <h4>Ascendant</h4>
                <p>{result.planets?.Ascendant?.sign || "Calculating..."}</p>
              </div>
              <div style={styles.infoCard}>
                <span style={styles.infoIcon}>🌙</span>
                <h4>Moon Sign</h4>
                <p>{result.planets?.Moon?.sign || "Calculating..."}</p>
              </div>
              <div style={styles.infoCard}>
                <span style={styles.infoIcon}>☀️</span>
                <h4>Sun Sign</h4>
                <p>{result.planets?.Sun?.sign || "Calculating..."}</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={styles.disclaimer}>
              <p>
                📌 This is a basic Kundali generated using Vedic astrology principles. 
                For detailed analysis and personalized predictions, please consult our expert astrologers.
              </p>
              <Link to="/voicecall" style={styles.consultBtn}>
                Consult an Astrologer 🔮
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>What's Included in Free Kundali</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🪐</span>
            <h3>Planetary Positions</h3>
            <p>Exact positions of all 9 planets at your birth time</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🏠</span>
            <h3>House Analysis</h3>
            <p>12 houses and their planetary occupants</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>⭐</span>
            <h3>Nakshatra Details</h3>
            <p>Your birth star and its characteristics</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📊</span>
            <h3>Basic Predictions</h3>
            <p>General life path insights based on your chart</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 Jyotish Urja. All rights reserved. ✨</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a1628 0%, #1a2a4a 50%, #0d1b2a 100%)",
    color: "#fff",
    fontFamily: "'Cinzel', serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 3rem",
    borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
  },
  logo: {
    color: "#d4af37",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: "2rem",
  },
  navLink: {
    color: "#d4af37",
    textDecoration: "none",
    fontSize: "0.9rem",
    letterSpacing: "1px",
  },
  hero: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "rgba(212, 175, 55, 0.05)",
  },
  heroTitle: {
    fontSize: "3rem",
    color: "#d4af37",
    marginBottom: "1rem",
  },
  heroDesc: {
    fontSize: "1.2rem",
    color: "#ccc",
    maxWidth: "600px",
    margin: "0 auto",
  },
  formSection: {
    padding: "3rem 2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  form: {
    background: "rgba(26, 42, 74, 0.8)",
    border: "2px solid rgba(212, 175, 55, 0.3)",
    borderRadius: "20px",
    padding: "2rem",
  },
  formTitle: {
    color: "#d4af37",
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: "#aaa",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  input: {
    padding: "0.9rem",
    borderRadius: "10px",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    background: "rgba(0, 0, 0, 0.3)",
    color: "#fff",
    fontSize: "1rem",
  },
  submitBtn: {
    width: "100%",
    padding: "1rem",
    background: "#d4af37",
    color: "#0a1628",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "1.5rem",
  },
  errorContainer: {
    textAlign: "center",
    padding: "1rem",
    marginTop: "1rem",
  },
  errorText: {
    color: "#ff6b6b",
  },
  resultSection: {
    marginTop: "2rem",
    background: "rgba(26, 42, 74, 0.9)",
    border: "2px solid #d4af37",
    borderRadius: "20px",
    padding: "2rem",
  },
  resultHeader: {
    textAlign: "center",
    borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
    paddingBottom: "1rem",
    marginBottom: "2rem",
  },
  resultTitle: {
    color: "#d4af37",
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  resultSubtitle: {
    color: "#aaa",
    fontSize: "1rem",
  },
  planetsSection: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    color: "#d4af37",
    fontSize: "1.3rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  planetsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "1rem",
  },
  planetCard: {
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "15px",
    padding: "1rem",
    textAlign: "center",
    border: "1px solid rgba(212, 175, 55, 0.2)",
  },
  planetEmoji: {
    fontSize: "2rem",
    display: "block",
    marginBottom: "0.5rem",
  },
  planetName: {
    color: "#d4af37",
    fontSize: "0.95rem",
    marginBottom: "0.3rem",
  },
  planetInfo: {
    color: "#ccc",
    fontSize: "0.85rem",
    marginBottom: "0.2rem",
  },
  planetDegree: {
    color: "#888",
    fontSize: "0.8rem",
  },
  infoCards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  infoCard: {
    background: "rgba(212, 175, 55, 0.1)",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    borderRadius: "15px",
    padding: "1.5rem",
    textAlign: "center",
  },
  infoIcon: {
    fontSize: "2rem",
    display: "block",
    marginBottom: "0.5rem",
  },
  disclaimer: {
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "15px",
    padding: "1.5rem",
    textAlign: "center",
  },
  consultBtn: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.8rem 2rem",
    background: "#d4af37",
    color: "#0a1628",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "bold",
  },
  featuresSection: {
    padding: "3rem 2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  featuresTitle: {
    textAlign: "center",
    color: "#d4af37",
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
  },
  featureCard: {
    background: "rgba(26, 42, 74, 0.8)",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    borderRadius: "15px",
    padding: "1.5rem",
    textAlign: "center",
  },
  featureIcon: {
    fontSize: "2.5rem",
    display: "block",
    marginBottom: "0.5rem",
  },
  footer: {
    textAlign: "center",
    padding: "2rem",
    borderTop: "1px solid rgba(212, 175, 55, 0.3)",
    color: "#888",
  },
};

export default FreeKundali;
