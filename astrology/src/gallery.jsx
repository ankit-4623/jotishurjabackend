import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, getGalleryMedia } from "./api/api";

const categories = ["All", "event", "puja", "gemstone", "other"];
const categoryLabels = {
  "All": "All",
  "event": "Events",
  "puja": "Puja",
  "gemstone": "Gemstones",
  "other": "Other"
};

const Gallery = () => {
  const [user, setUser] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
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

  // Fetch gallery items from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const category = selectedCategory === "All" ? "all" : selectedCategory;
        const response = await getGalleryMedia("all", category);
        if (response.success) {
          setGalleryItems(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [selectedCategory]);

  const filteredItems = galleryItems;

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
        <h1 style={styles.heroTitle}>🖼️ Gallery</h1>
        <p style={styles.heroDesc}>
          Explore our collection of sacred moments, rituals, and astrological events
        </p>
      </section>

      {/* Category Filter */}
      <section style={styles.filterSection}>
        <div style={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.filterBtn,
                ...(selectedCategory === category ? styles.filterBtnActive : {}),
              }}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={styles.gallerySection}>
        {loading ? (
          <div style={{textAlign: 'center', padding: '3rem'}}>
            <p style={{color: '#d4af37', fontSize: '1.2rem'}}>Loading gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div style={{textAlign: 'center', padding: '3rem'}}>
            <p style={{color: '#ccc', fontSize: '1.2rem'}}>No items in this category yet</p>
          </div>
        ) : (
          <div style={styles.galleryGrid}>
            {filteredItems.map((item) => (
              <div
                key={item._id}
                style={styles.galleryCard}
                onClick={() => setSelectedItem(item)}
              >
                {item.type === 'photo' ? (
                  <img 
                    src={item.url} 
                    alt={item.title || 'Gallery'} 
                    style={styles.cardImageReal}
                  />
                ) : (
                  <video style={styles.cardImageReal}>
                    <source src={item.url} type="video/mp4" />
                  </video>
                )}
                <div style={styles.cardContent}>
                  <span style={styles.cardCategory}>{categoryLabels[item.category] || item.category}</span>
                  <h3 style={styles.cardTitle}>{item.title || item.type === 'photo' ? 'Photo' : 'Video'}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedItem && (
        <div style={styles.modal} onClick={() => setSelectedItem(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedItem(null)}>
              ✕
            </button>
            {selectedItem.type === 'photo' ? (
              <img 
                src={selectedItem.url} 
                alt={selectedItem.title || 'Gallery'} 
                style={styles.modalImageReal}
              />
            ) : (
              <video controls style={styles.modalImageReal}>
                <source src={selectedItem.url} type="video/mp4" />
              </video>
            )}
            <h2 style={styles.modalTitle}>{selectedItem.title || (selectedItem.type === 'photo' ? 'Photo' : 'Video')}</h2>
            <span style={styles.modalCategory}>{categoryLabels[selectedItem.category] || selectedItem.category}</span>
            <div style={styles.modalActions}>
              <Link to="/voicecall" style={styles.actionBtn}>
                Consult Now 📞
              </Link>
              <Link to="/puja" style={styles.actionBtnSecondary}>
                Book Puja 🙏
              </Link>
            </div>
          </div>
        </div>
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
  filterSection: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  filterContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  },
  filterBtn: {
    padding: "0.7rem 1.5rem",
    background: "transparent",
    border: "2px solid rgba(212, 175, 55, 0.3)",
    borderRadius: "25px",
    color: "#d4af37",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
  },
  filterBtnActive: {
    background: "#d4af37",
    color: "#0a1628",
    borderColor: "#d4af37",
  },
  gallerySection: {
    padding: "2rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.5rem",
  },
  galleryCard: {
    background: "rgba(26, 42, 74, 0.8)",
    border: "2px solid rgba(212, 175, 55, 0.3)",
    borderRadius: "15px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  cardImage: {
    height: "150px",
    background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(26, 42, 74, 0.9))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
  },
  cardImageReal: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "1.2rem",
  },
  cardCategory: {
    fontSize: "0.75rem",
    color: "#d4af37",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  cardTitle: {
    color: "#fff",
    fontSize: "1.1rem",
    margin: "0.5rem 0",
  },
  cardDesc: {
    color: "#aaa",
    fontSize: "0.85rem",
    lineHeight: "1.5",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "linear-gradient(135deg, #1a2a4a, #0d1b2a)",
    border: "2px solid #d4af37",
    borderRadius: "20px",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    color: "#d4af37",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  modalImage: {
    fontSize: "5rem",
    marginBottom: "1rem",
  },
  modalImageReal: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "1rem",
  },
  modalTitle: {
    color: "#d4af37",
    fontSize: "1.8rem",
    marginBottom: "0.5rem",
  },
  modalCategory: {
    display: "inline-block",
    padding: "0.3rem 1rem",
    background: "rgba(212, 175, 55, 0.2)",
    borderRadius: "15px",
    color: "#d4af37",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
  modalDesc: {
    color: "#ccc",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  modalActions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
  actionBtn: {
    padding: "0.8rem 1.5rem",
    background: "#d4af37",
    color: "#0a1628",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "bold",
  },
  actionBtnSecondary: {
    padding: "0.8rem 1.5rem",
    background: "transparent",
    border: "2px solid #d4af37",
    color: "#d4af37",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    padding: "2rem",
    borderTop: "1px solid rgba(212, 175, 55, 0.3)",
    color: "#888",
  },
};

export default Gallery;
