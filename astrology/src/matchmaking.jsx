import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { matchmaking, getUserProfile } from "./api/api";

const MatchMaking = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const [maleData, setMaleData] = useState({
    year: "",
    month: "",
    date: "",
    hours: "",
    minutes: "",
    seconds: 0,
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5,
  });

  const [femaleData, setFemaleData] = useState({
    year: "",
    month: "",
    date: "",
    hours: "",
    minutes: "",
    seconds: 0,
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 5.5,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.user);
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleMaleChange = (e) => {
    const { name, value } = e.target;
    setMaleData((prev) => ({ ...prev, [name]: parseInt(value) || value }));
  };

  const handleFemaleChange = (e) => {
    const { name, value } = e.target;
    setFemaleData((prev) => ({ ...prev, [name]: parseInt(value) || value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await matchmaking({
        male: maleData,
        female: femaleData,
      });
      setResult(response.data);
    } catch (err) {
      setError("Failed to check compatibility. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 28) return "#4ade80";
    if (score >= 18) return "#fbbf24";
    return "#f87171";
  };

  const getScoreMessage = (score) => {
    if (score >= 28) return "Excellent Match! 💕";
    if (score >= 18) return "Good Compatibility 💫";
    return "Needs Consideration 💭";
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
        <h1 style={styles.heroTitle}>💞 Match Making</h1>
        <p style={styles.heroDesc}>
          Free compatibility analysis for marriage and relationships based on Vedic astrology
        </p>
      </section>

      {/* Form Section */}
      <section style={styles.formSection}>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Male Partner */}
          <div style={styles.partnerSection}>
            <h3 style={styles.partnerTitle}>👨 Male Partner Details</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Year</label>
                <input
                  type="number"
                  name="year"
                  value={maleData.year}
                  onChange={handleMaleChange}
                  placeholder="e.g., 1995"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Month</label>
                <input
                  type="number"
                  name="month"
                  value={maleData.month}
                  onChange={handleMaleChange}
                  placeholder="1-12"
                  min="1"
                  max="12"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Date</label>
                <input
                  type="number"
                  name="date"
                  value={maleData.date}
                  onChange={handleMaleChange}
                  placeholder="1-31"
                  min="1"
                  max="31"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Hour (24h)</label>
                <input
                  type="number"
                  name="hours"
                  value={maleData.hours}
                  onChange={handleMaleChange}
                  placeholder="0-23"
                  min="0"
                  max="23"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Minutes</label>
                <input
                  type="number"
                  name="minutes"
                  value={maleData.minutes}
                  onChange={handleMaleChange}
                  placeholder="0-59"
                  min="0"
                  max="59"
                  style={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          {/* Female Partner */}
          <div style={styles.partnerSection}>
            <h3 style={styles.partnerTitle}>👩 Female Partner Details</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Year</label>
                <input
                  type="number"
                  name="year"
                  value={femaleData.year}
                  onChange={handleFemaleChange}
                  placeholder="e.g., 1996"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Month</label>
                <input
                  type="number"
                  name="month"
                  value={femaleData.month}
                  onChange={handleFemaleChange}
                  placeholder="1-12"
                  min="1"
                  max="12"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Date</label>
                <input
                  type="number"
                  name="date"
                  value={femaleData.date}
                  onChange={handleFemaleChange}
                  placeholder="1-31"
                  min="1"
                  max="31"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Hour (24h)</label>
                <input
                  type="number"
                  name="hours"
                  value={femaleData.hours}
                  onChange={handleFemaleChange}
                  placeholder="0-23"
                  min="0"
                  max="23"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birth Minutes</label>
                <input
                  type="number"
                  name="minutes"
                  value={femaleData.minutes}
                  onChange={handleFemaleChange}
                  placeholder="0-59"
                  min="0"
                  max="59"
                  style={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Checking Compatibility..." : "Check Compatibility 💕"}
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
            <h2 style={styles.resultTitle}>Compatibility Result</h2>
            <div style={styles.scoreCard}>
              <div
                style={{
                  ...styles.scoreCircle,
                  borderColor: getScoreColor(result.score || result.total || 0),
                }}
              >
                <span style={{ ...styles.scoreNumber, color: getScoreColor(result.score || result.total || 0) }}>
                  {result.score || result.total || 0}
                </span>
                <span style={styles.scoreMax}>/36</span>
              </div>
              <p style={{ ...styles.scoreMessage, color: getScoreColor(result.score || result.total || 0) }}>
                {getScoreMessage(result.score || result.total || 0)}
              </p>
            </div>

            {result.details && (
              <div style={styles.detailsGrid}>
                {Object.entries(result.details).map(([key, value]) => (
                  <div key={key} style={styles.detailCard}>
                    <h4 style={styles.detailTitle}>{key}</h4>
                    <p style={styles.detailValue}>{typeof value === 'object' ? JSON.stringify(value) : value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section style={styles.infoSection}>
        <h2 style={styles.infoTitle}>About Ashtakoot Matching</h2>
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🌙</span>
            <h3>Varna (1 Point)</h3>
            <p>Spiritual compatibility and ego levels</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>💫</span>
            <h3>Vashya (2 Points)</h3>
            <p>Mutual attraction and control</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>⭐</span>
            <h3>Tara (3 Points)</h3>
            <p>Birth star compatibility</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🦁</span>
            <h3>Yoni (4 Points)</h3>
            <p>Physical and sexual compatibility</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🪐</span>
            <h3>Graha Maitri (5 Points)</h3>
            <p>Mental compatibility</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🐍</span>
            <h3>Gana (6 Points)</h3>
            <p>Temperament matching</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🔮</span>
            <h3>Bhakoot (7 Points)</h3>
            <p>Love and family life</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>❤️</span>
            <h3>Nadi (8 Points)</h3>
            <p>Health and genes compatibility</p>
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
    maxWidth: "900px",
    margin: "0 auto",
  },
  form: {
    background: "rgba(26, 42, 74, 0.8)",
    border: "2px solid rgba(212, 175, 55, 0.3)",
    borderRadius: "20px",
    padding: "2rem",
  },
  partnerSection: {
    marginBottom: "2rem",
    padding: "1.5rem",
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
  },
  partnerTitle: {
    color: "#d4af37",
    fontSize: "1.3rem",
    marginBottom: "1rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: "#aaa",
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
  },
  input: {
    padding: "0.8rem",
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
    marginTop: "1rem",
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
    textAlign: "center",
  },
  resultTitle: {
    color: "#d4af37",
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
  },
  scoreCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  scoreCircle: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "6px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreNumber: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
  scoreMax: {
    fontSize: "1rem",
    color: "#888",
  },
  scoreMessage: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1rem",
    marginTop: "2rem",
  },
  detailCard: {
    background: "rgba(0, 0, 0, 0.3)",
    padding: "1rem",
    borderRadius: "10px",
  },
  detailTitle: {
    color: "#d4af37",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  detailValue: {
    color: "#fff",
    fontSize: "1.1rem",
  },
  infoSection: {
    padding: "3rem 2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  infoTitle: {
    textAlign: "center",
    color: "#d4af37",
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  infoCard: {
    background: "rgba(26, 42, 74, 0.8)",
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
  footer: {
    textAlign: "center",
    padding: "2rem",
    borderTop: "1px solid rgba(212, 175, 55, 0.3)",
    color: "#888",
  },
};

export default MatchMaking;
