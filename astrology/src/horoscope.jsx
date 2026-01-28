import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDailyHoroscope, getUserProfile } from "./api/api";

const zodiacSigns = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth" },
  { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water" },
];

const DailyHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const fetchHoroscope = async (sign) => {
    setLoading(true);
    setError("");
    setSelectedSign(sign);
    try {
      const response = await getDailyHoroscope(sign.name.toLowerCase());
      setHoroscope(response.data);
    } catch (err) {
      setError("Failed to fetch horoscope. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        <h1 style={styles.heroTitle}>🌟 Daily Horoscope</h1>
        <p style={styles.heroDesc}>
          Get your daily astrological predictions and guidance based on your zodiac sign
        </p>
      </section>

      {/* Zodiac Signs Grid */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Select Your Zodiac Sign</h2>
        <div style={styles.zodiacGrid}>
          {zodiacSigns.map((sign) => (
            <div
              key={sign.name}
              style={{
                ...styles.zodiacCard,
                ...(selectedSign?.name === sign.name ? styles.selectedCard : {}),
              }}
              onClick={() => fetchHoroscope(sign)}
            >
              <span style={styles.zodiacSymbol}>{sign.symbol}</span>
              <h3 style={styles.zodiacName}>{sign.name}</h3>
              <p style={styles.zodiacDates}>{sign.dates}</p>
              <span style={styles.zodiacElement}>{sign.element}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Horoscope Result */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Fetching your horoscope...</p>
        </div>
      )}

      {error && (
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}

      {horoscope && !loading && (
        <section style={styles.resultSection}>
          <div style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <span style={styles.resultSymbol}>{selectedSign?.symbol}</span>
              <h2 style={styles.resultTitle}>{selectedSign?.name} Horoscope</h2>
            </div>
            <p style={styles.horoscopeText}>{horoscope.horoscope || horoscope}</p>
            <div style={styles.resultFooter}>
              <span>🌙 Updated Daily</span>
              <span>⭐ {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </section>
      )}

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
  section: {
    padding: "3rem 2rem",
    maxWidth: "1600px",
    margin: "0 auto",
  },
  sectionTitle: {
    textAlign: "center",
    color: "#d4af37",
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  zodiacGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.5rem",
  },
  zodiacCard: {
    background: "rgba(26, 42, 74, 0.8)",
    border: "2px solid rgba(212, 175, 55, 0.3)",
    borderRadius: "15px",
    padding: "1.5rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  selectedCard: {
    border: "2px solid #d4af37",
    background: "rgba(212, 175, 55, 0.1)",
    transform: "scale(1.05)",
  },
  zodiacSymbol: {
    fontSize: "2.5rem",
    display: "block",
    marginBottom: "0.5rem",
  },
  zodiacName: {
    color: "#d4af37",
    fontSize: "1.1rem",
    marginBottom: "0.3rem",
  },
  zodiacDates: {
    fontSize: "0.8rem",
    color: "#aaa",
    marginBottom: "0.5rem",
  },
  zodiacElement: {
    fontSize: "0.75rem",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "3rem",
    color: "#d4af37",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(212, 175, 55, 0.3)",
    borderTop: "4px solid #d4af37",
    borderRadius: "50%",
    margin: "0 auto 1rem",
    animation: "spin 1s linear infinite",
  },
  errorContainer: {
    textAlign: "center",
    padding: "2rem",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: "1.1rem",
  },
  resultSection: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  resultCard: {
    background: "rgba(26, 42, 74, 0.9)",
    border: "2px solid #d4af37",
    borderRadius: "20px",
    padding: "2rem",
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
    borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
    paddingBottom: "1rem",
  },
  resultSymbol: {
    fontSize: "3rem",
  },
  resultTitle: {
    color: "#d4af37",
    fontSize: "1.8rem",
  },
  horoscopeText: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "#ddd",
  },
  resultFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
    paddingTop: "1rem",
    borderTop: "1px solid rgba(212, 175, 55, 0.3)",
    color: "#888",
    fontSize: "0.9rem",
  },
  footer: {
    textAlign: "center",
    padding: "2rem",
    borderTop: "1px solid rgba(212, 175, 55, 0.3)",
    color: "#888",
  },
};

export default DailyHoroscope;
