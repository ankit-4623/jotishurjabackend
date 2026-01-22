"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "./api/api";

const translations = {
  en: {
    logo: "JYOTISH URJA",
    navHome: "HOME",
    navServices: "SERVICES",
    navAbout: "ABOUT",
    navContact: "CONTACT",
    heroTitle: "Vedic Gemstones",
    heroDescription:
      "Discover authentic Vedic gemstones to align your energies with the cosmos, backed by certificates of authenticity and fast, secure delivery.",
    sectionTitle: "Explore Our Gemstones",
    searchPlaceholder: "Search by gemstone or planet (e.g., Ruby, Sun)",
    noResults: "No gemstones found matching your search.",
    planet: "Planet:",
    benefits: "Benefits:",
    price: "Price:",
    buyButton: "Buy Now",
    uspTitle: "Why Our Gemstones Are the Best",
    uspAuthenticityTitle: "Certified Authenticity",
    uspAuthenticityDescription:
      "Every gemstone comes with a certificate of authenticity, ensuring genuine Vedic quality and origin.",
    uspDeliveryTitle: "Fast & Secure Delivery",
    uspDeliveryDescription:
      "We offer swift, secure, and reliable delivery to ensure your gemstone reaches you safely and promptly.",
    uspAlignmentTitle: "Vedic Alignment",
    uspAlignmentDescription:
      "Our gemstones are carefully selected to align with Vedic astrology principles for maximum cosmic benefits.",
    footerLogo: "Jyotish Urja",
    footerDescription:
      "Empowering your spiritual journey with authentic Vedic gemstones and astrological guidance.",
    footerAbout: "About Us",
    footerServices: "Services",
    footerContact: "Contact",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCopyright:
      "© 2025 Jyotish Urja. All rights reserved. | Designed with cosmic energy ✨",
    chatbotWelcome:
      "Welcome to Jyoti, your Divine Light! 🌟 How can I assist you with gemstones?",
    chatbotGemstoneSupport: "Gemstone Support",
    chatbotSend: "Send",
  },
  hi: {
    logo: "ज्योतिष ऊर्जा",
    navHome: "होम",
    navServices: "सेवाएँ",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क",
    heroTitle: "वैदिक रत्न",
    heroDescription:
      "ब्रह्मांड से संरेखित करने के लिए प्रमाणित प्रामाणिकता और तेज, सुरक्षित वितरण के साथ वैदिक रत्नों की खोज करें।",
    sectionTitle: "हमारे रत्नों का अन्वेषण करें",
    searchPlaceholder: "रत्न या ग्रह द्वारा खोजें (उदाहरण, रूबी, सूर्य)",
    noResults: "आपकी खोज से मिलते-जुलते कोई रत्न नहीं मिले।",
    planet: "ग्रह:",
    benefits: "लाभ:",
    price: "मूल्य:",
    buyButton: "अभी खरीदें",
    uspTitle: "हमारे रत्न क्यों सर्वश्रेष्ठ हैं",
    uspAuthenticityTitle: "प्रमाणित प्रामाणिकता",
    uspAuthenticityDescription:
      "प्रत्येक रत्न प्रामाणिकता का प्रमाण-पत्र के साथ आता है, जो वैदिक गुणवत्ता और मूल की सुनिश्चित करता है।",
    uspDeliveryTitle: "तेज और सुरक्षित वितरण",
    uspDeliveryDescription:
      "हम तेज, सुरक्षित और विश्वसनीय वितरण प्रदान करते हैं ताकि आपका रत्न सुरक्षित रूप से पहुंचे।",
    uspAlignmentTitle: "वैदिक संरेखण",
    uspAlignmentDescription:
      "हमारे रत्न वैदिक ज्योतिष सिद्धांतों से संरेखित करने के लिए सावधानी से चुने जाते हैं।",
    footerLogo: "ज्योतिष ऊर्जा",
    footerDescription:
      "प्रामाणिक वैदिक रत्नों और ज्योतिषीय मार्गदर्शन के साथ अपनी आध्यात्मिक यात्रा को सशक्त बनाएं।",
    footerAbout: "हमारे बारे में",
    footerServices: "सेवाएँ",
    footerContact: "संपर्क",
    footerPrivacy: "गोपनीयता नीति",
    footerTerms: "सेवा की शर्तें",
    footerCopyright:
      "© 2025 ज्योतिष ऊर्जा। सभी अधिकार सुरक्षित। | ब्रह्मांडीय ऊर्जा से डिज़ाइन किया गया ✨",
    chatbotWelcome:
      "ज्योति में आपका स्वागत है, आपकी दिव्य प्रकाश! 🌟 रत्नों से कैसे सहायता कर सकता हूँ?",
    chatbotGemstoneSupport: "रत्न समर्थन",
    chatbotSend: "भेजें",
  },
};

const Gemstone = () => {
  const [gemstones, setGemstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Fetch Gemstones from Backend
  useEffect(() => {
    const fetchGemstones = async () => {
      try {
        const response = await getAllProducts();
        if (response.success) {
          const gemstoneData = response.products.filter(
            (product) => product.category === "gemstone"
          );
          setGemstones(gemstoneData);
        } else {
          setError("Failed to fetch gemstones.");
        }
      } catch (err) {
        console.error("Error fetching gemstones:", err);
        setError("Error fetching gemstones. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGemstones();
  }, []);

  const filteredGemstones = gemstones.filter((gem) =>
    language === "en"
      ? gem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (gem.planet && gem.planet.toLowerCase().includes(searchTerm.toLowerCase()))
      : (gem.name_hi && gem.name_hi.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (gem.planet_hi && gem.planet_hi.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        { sender: "Jyoti", text: translations[language].chatbotWelcome },
      ]);
    }
  }, [isChatOpen, language]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = (text) => {
    const userMessage = { sender: "You", text };
    setMessages((prev) => [...prev, userMessage]);

    // Dynamic responses based on fetched gemstones
    let botResponseText = translations[language].chatbotNoResponse || "I didn't understand that.";

    // Check if text matches any gemstone name
    const matchedGem = gemstones.find(g =>
      g.name.toLowerCase() === text.toLowerCase() ||
      (g.name_hi && g.name_hi === text)
    );

    if (matchedGem) {
      if (language === "en") {
        botResponseText = `${matchedGem.name} is associated with ${matchedGem.planet || 'a planet'}. ${matchedGem.benefits || ''} Price: ₹${matchedGem.price}.`;
      } else {
        botResponseText = `${matchedGem.name_hi || matchedGem.name} ${matchedGem.planet_hi ? matchedGem.planet_hi + ' से जुड़ा है' : ''}。 ${matchedGem.benefits_hi || ''} मूल्य: ₹${matchedGem.price}.`;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "Jyoti", text: botResponseText },
      ]);
    }, 500);
    setUserInput("");
  };

  const quickMessages =
    language === "en"
      ? gemstones.map((gem) => gem.name)
      : gemstones.map((gem) => gem.name_hi || gem.name);

  const handleBuy = (gem) => {
    alert(
      `${translations[language].buyButton} ${ // using buyButton generically or adding specific alert key if exists
      language === "en" ? gem.name : (gem.name_hi || gem.name)
      } - ₹${gem.price}`
    );
    // Integrate payment here if needed
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600&family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
            background: linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%);
            color: #faf0e6;
            overflow-x: hidden;
            line-height: 1.6;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(1.5px 1.5px at 20px 30px, #ffd700, transparent),
              radial-gradient(1.5px 1.5px at 40px 70px, #fff, transparent),
              radial-gradient(1px 1px at 90px 40px, #ffd700, transparent),
              radial-gradient(1px 1px at 130px 80px, #fff, transparent),
              radial-gradient(1.5px 1.5px at 160px 30px, #ffd700, transparent),
              radial-gradient(1px 1px at 200px 60px, #d4af37, transparent),
              radial-gradient(1.5px 1.5px at 300px 120px, #fff, transparent);
            background-repeat: repeat;
            background-size: 200px 120px;
            animation: twinkle 30s infinite;
            pointer-events: none;
            z-index: 0;
            opacity: 0.3;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: translateY(0px); }
            50% { opacity: 0.7; transform: translateY(-5px); }
          }

          .main-container {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
            backdrop-filter: blur(8px);
            background: rgba(26, 35, 50, 0.85);
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }

          .logo {
            display: flex;
            align-items: center;
            font-size: 22px;
            font-weight: 700;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Playfair Display', serif"
          };
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #d4af37;
          }

          .logo-symbol {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
            border: 2px solid #d4af37;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 12px;
            font-size: 18px;
            color: #d4af37;
            position: relative;
            animation: glow 3.5s ease-in-out infinite alternate;
          }

          @keyframes glow {
            0% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.3), inset 0 0 10px rgba(212, 175, 55, 0.1); transform: scale(1); }
            100% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.6), inset 0 0 15px rgba(212, 175, 55, 0.2); transform: scale(1.03); }
          }

          .nav-container {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .nav {
            display: flex;
            gap: 10px;
            justify-content: center;
          }

          .nav a {
            color: #d4af37;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 10px 20px;
            border: 2px solid transparent;
            border-radius: 25px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .nav a::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
            transition: left 0.5s ease;
          }

          .nav a:hover::before {
            left: 100%;
          }

          .nav a:hover {
            border-color: #d4af37;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.2);
            background: rgba(212, 175, 55, 0.1);
          }

          .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
          }

          .hamburger span {
            width: 25px;
            height: 3px;
            background: #d4af37;
            transition: all 0.3s ease;
          }

          .hamburger.open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }

          .hamburger.open span:nth-child(2) {
            opacity: 0;
          }

          .hamburger.open span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
          }

          .user-profile {
            position: relative;
          }

          .profile-icon {
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid #d4af37;
            box-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
          }

          .profile-icon:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
          }

          .profile-icon svg {
            width: 28px;
            height: 28px;
            fill: #1a2332;
          }

          .dropdown {
            position: absolute;
            top: 60px;
            right: 0;
            background: rgba(26, 35, 50, 0.95);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            padding: 15px;
            min-width: 180px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          }

          .dropdown.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .dropdown-item {
            display: block;
            color: #d4af37;
            text-decoration: none;
            padding: 10px 15px;
            border-radius: 10px;
            transition: all 0.3s ease;
            font-weight: 500;
            margin-bottom: 5px;
            border: 1px solid transparent;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .dropdown-item:hover {
            background: rgba(212, 175, 55, 0.1);
            transform: translateX(5px);
            border-color: rgba(212, 175, 55, 0.2);
          }

          .hero-section {
            padding: 100px 40px;
            position: relative;
            z-index: 5;
            min-height: 80vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, rgba(26, 35, 50, 0.8), rgba(65, 90, 119, 0.4));
            backdrop-filter: blur(8px);
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          }

          .hero-content {
            max-width: 700px;
            text-align: center;
            padding: 30px;
          }

          .hero-content h1 {
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Playfair Display', serif"
          };
            font-size: clamp(36px, 6vw, 48px);
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 20px;
            line-height: 1.3;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            letter-spacing: 1.5px;
          }

          .hero-content p {
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Crimson Text', serif"
          };
            font-size: clamp(18px, 3vw, 24px);
            color: rgba(212, 175, 55, 0.9);
            margin-bottom: 30px;
            line-height: 1.6;
          }

          .gem-svg {
            width: 150px;
            height: 150px;
            margin: 0 auto 20px;
            animation: glow 3.5s ease-in-out infinite alternate;
          }

          .gem-svg .gem-path {
            fill: rgba(212, 175, 55, 0.2);
            stroke: #d4af37;
            stroke-width: 2;
            transition: all 0.3s ease;
          }

          .gem-svg .sparkle {
            fill: #d4af37;
            stroke: #e9c46a;
            stroke-width: 1;
          }

          .gem-svg:hover .gem-path {
            fill: rgba(212, 175, 55, 0.3);
            stroke: #e9c46a;
          }

          .section {
            padding: 80px 40px;
            position: relative;
            z-index: 5;
            background: rgba(26, 35, 50, 0.7);
            backdrop-filter: blur(8px);
            margin-top: 20px;
            border-radius: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .section-title {
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Playfair Display', serif"
          };
            font-size: clamp(32px, 5vw, 40px);
            font-weight: 700;
            text-align: center;
            color: #d4af37;
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 2px;
            position: relative;
          }

          .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
            border-radius: 2px;
          }

          .search-container {
            max-width: 500px;
            width: 100%;
            margin: 0 auto 30px;
            position: relative;
          }

          .search-input {
            width: 100%;
            padding: 12px 15px 12px 40px;
            font-size: 14px;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 25px;
            background: rgba(26, 35, 50, 0.8);
            color: #faf0e6;
            transition: all 0.3s ease;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .search-input:focus {
            border-color: #d4af37;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
            outline: none;
          }

          .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: #d4af37;
          }

          .gemstone-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            justify-items: center;
          }

          .gemstone-card {
            background: rgba(26, 35, 50, 0.9);
            backdrop-filter: blur(8px);
            padding: 25px;
            border-radius: 20px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(212, 175, 55, 0.2);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 300px;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
          }

          .gemstone-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
            transition: left 0.5s ease;
            z-index: -1;
          }

          .gemstone-card:hover::before {
            left: 0;
          }

          .gemstone-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
            border-color: rgba(212, 175, 55, 0.4);
          }

          .gemstone-card img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 15px;
            transition: all 0.3s ease;
          }

          .gemstone-card:hover img {
            transform: scale(1.03);
          }

          .gemstone-card .gem-icon {
            font-size: 40px;
            margin-bottom: 15px;
            color: #d4af37;
            transition: all 0.3s ease;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          .gemstone-card:hover .gem-icon {
            transform: scale(1.1) rotate(5deg);
            text-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
          }

          .gemstone-card h3 {
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Playfair Display', serif"
          };
            font-size: 20px;
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .gemstone-card p {
            font-size: 14px;
            color: rgba(212, 175, 55, 0.9);
            margin-bottom: 10px;
            line-height: 1.6;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .gemstone-card .price {
            font-size: 18px;
            font-weight: 600;
            color: #d4af37;
            margin-bottom: 15px;
          }

          .gemstone-card .buy-button {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            color: #1a2332;
            border: none;
            padding: 10px 25px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
            min-height: 36px;
          }

          .gemstone-card .buy-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
          }

          .gemstone-card .buy-button:hover::before {
            left: 100%;
          }

          .gemstone-card .buy-button:hover {
            background: linear-gradient(135deg, #e9c46a, #d4af37);
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
          }

          .usp-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            justify-items: center;
          }

          .usp-card {
            background: rgba(26, 35, 50, 0.9);
            backdrop-filter: blur(8px);
            padding: 30px 25px;
            border-radius: 20px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(212, 175, 55, 0.2);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 350px;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
          }

          .usp-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
            transition: left 0.5s ease;
            z-index: -1;
          }

          .usp-card:hover::before {
            left: 0;
          }

          .usp-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
            border-color: rgba(212, 175, 55, 0.4);
          }

          .usp-card h3 {
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Playfair Display', serif"
          };
            font-size: 20px;
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .usp-card p {
            font-size: 14px;
            color: rgba(212, 175, 55, 0.9);
            line-height: 1.6;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .usp-icon {
            font-size: 40px;
            margin-bottom: 15px;
            color: #d4af37;
            transition: all 0.3s ease;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          .usp-card:hover .usp-icon {
            transform: scale(1.1) rotate(5deg);
            text-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
          }

          .footer {
            background: rgba(13, 27, 42, 0.95);
            backdrop-filter: blur(8px);
            padding: 60px 40px 30px;
            text-align: center;
            border-top: 1px solid rgba(212, 175, 55, 0.2);
            position: relative;
            z-index: 5;
            margin-top: 40px;
            width: 100%;
          }

          .footer-content {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .footer-logo {
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Playfair Display', serif"
          };
            font-size: 32px;
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .footer-description {
            font-size: 16px;
            color: rgba(212, 175, 55, 0.9);
            margin-bottom: 30px;
            max-width: 600px;
            line-height: 1.6;
            text-align: center;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .footer-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }

          .footer-links a {
            color: #d4af37;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            padding: 6px 12px;
            border-radius: 15px;
            transition: all 0.3s ease;
            min-height: 36px;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .footer-links a:hover {
            color: #e9c46a;
            transform: translateY(-2px);
            background: rgba(212, 175, 55, 0.1);
          }

          .footer-bottom {
            border-top: 1px solid rgba(212, 175, 55, 0.2);
            padding-top: 20px;
            color: rgba(212, 175, 55, 0.8);
            font-size: 13px;
            width: 100%;
            text-align: center;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .chatbot-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(212, 175, 55, 0.4);
            transition: all 0.3s ease;
          }

          .chatbot-button:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.5);
          }

          .chatbot-button svg {
            width: 24px;
            height: 24px;
            fill: #1a2332;
          }

          .chatbot-container {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 320px;
            max-height: 450px;
            background: rgba(26, 35, 50, 0.95);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            overflow: hidden;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            display: ${isChatOpen ? "flex" : "none"};
            flex-direction: column;
          }

          .chatbot-header {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            padding: 12px 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
          }

          .chatbot-header svg {
            width: 20px;
            height: 20px;
            fill: #1a2332;
          }

          .chatbot-header h3 {
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Playfair Display', serif"
          };
            font-size: 18px;
            color: #1a2332;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
          }

          .chatbot-header p {
            font-size: 11px;
            color: #1a2332;
            font-style: italic;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .chatbot-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .message {
            max-width: 85%;
            padding: 8px 12px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.5;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .message.user {
            background: #d4af37;
            color: #1a2332;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
          }

          .message.bot {
            background: rgba(212, 175, 55, 0.2);
            color: #faf0e6;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
          }

          .chatbot-quick-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px 15px;
            border-top: 1px solid rgba(212, 175, 55, 0.2);
          }

          .quick-button {
            background: rgba(212, 175, 55, 0.2);
            color: #d4af37;
            border: 1px solid rgba(212, 175, 55, 0.3);
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            flex: 1;
            min-width: 90px;
            min-height: 36px;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .quick-button:hover {
            background: #d4af37;
            color: #1a2332;
            transform: translateY(-2px);
          }

          .chatbot-input-container {
            display: flex;
            padding: 10px 15px;
            border-top: 1px solid rgba(212, 175, 55, 0.2);
          }

          .chatbot-input {
            flex: 1;
            padding: 8px 12px;
            font-size: 13px;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 12px;
            background: rgba(26, 35, 50, 0.8);
            color: #faf0e6;
            outline: none;
            transition: all 0.3s ease;
            min-height: 36px;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .chatbot-input:focus {
            border-color: #d4af37;
            box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
          }

          .chatbot-send-button {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            color: #1a2332;
            border: none;
            padding: 8px 12px;
            margin-left: 8px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            min-height: 36px;
            font-family: ${language === "hi"
            ? "'Noto Serif Devanagari', serif"
            : "'Source Sans 3', sans-serif"
          };
          }

          .chatbot-send-button:hover {
            background: linear-gradient(135deg, #e9c46a, #d4af37);
            transform: translateY(-2px);
          }

          /* Media Query for Tablets (max-width: 768px) */
          @media (max-width: 768px) {
            .main-container {
              max-width: 100%;
            }

            .header {
              padding: 15px 20px;
              flex-direction: column;
              gap: 15px;
            }

            .logo {
              font-size: 20px;
            }

            .logo-symbol {
              width: 40px;
              height: 40px;
              font-size: 18px;
              margin-right: 10px;
            }

            .nav-container {
              width: 100%;
              position: relative;
            }

            .hamburger {
              display: flex;
            }

            .nav {
              display: ${isNavOpen ? "flex" : "none"};
              flex-direction: column;
              gap: 10px;
              width: 100%;
              background: rgba(26, 35, 50, 0.9);
              padding: 15px;
              position: absolute;
              top: 50px;
              left: 0;
              border-radius: 0 0 10px 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }

            .nav a {
              font-size: 13px;
              padding: 8px 15px;
              border-radius: 18px;
              min-height: 40px;
              text-align: center;
            }

            .profile-icon {
              width: 36px;
              height: 36px;
            }

            .profile-icon svg {
              width: 20px;
              height: 20px;
            }

            .dropdown {
              top: 45px;
              min-width: 160px;
              padding: 12px;
            }

            .dropdown-item {
              padding: 8px 12px;
              font-size: 13px;
            }

            .hero-section {
              padding: 80px 20px;
            }

            .hero-content {
              max-width: 100%;
              padding: 20px;
            }

            .hero-content h1 {
              font-size: clamp(28px, 5vw, 36px);
              margin-bottom: 15px;
            }

            .hero-content p {
              font-size: clamp(16px, 2.5vw, 18px);
              margin-bottom: 20px;
            }

            .gem-svg {
              width: 120px;
              height: 120px;
              margin-bottom: 15px;
            }

            .section {
              padding: 60px 20px;
              margin-top: 15px;
            }

            .section-title {
              font-size: clamp(28px, 4.5vw, 32px);
              margin-bottom: 30px;
            }

            .section-title::after {
              width: 60px;
              height: 2px;
            }

            .search-container {
              max-width: 90%;
              margin-bottom: 30px;
            }

            .search-input {
              padding: 10px 15px 10px 40px;
              font-size: 13px;
              border-radius: 20px;
            }

            .search-icon {
              left: 10px;
              font-size: 18px;
            }

            .gemstone-container {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .gemstone-card {
              padding: 20px;
              max-width: 90%;
              border-radius: 15px;
            }

            .gemstone-card img {
              height: 160px;
              border-radius: 10px;
              margin-bottom: 15px;
            }

            .gemstone-card .gem-icon {
              font-size: 36px;
              margin-bottom: 12px;
            }

            .gemstone-card h3 {
              font-size: 18px;
              margin-bottom: 8px;
            }

            .gemstone-card p {
              font-size: 13px;
              margin-bottom: 8px;
            }

            .gemstone-card .price {
              font-size: 16px;
              margin-bottom: 12px;
            }

            .gemstone-card .buy-button {
              padding: 8px 20px;
              font-size: 13px;
              border-radius: 20px;
              min-height: 36px;
            }

            .usp-container {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .usp-card {
              padding: 25px 20px;
              max-width: 90%;
              border-radius: 15px;
            }

            .usp-card h3 {
              font-size: 18px;
              margin-bottom: 8px;
            }

            .usp-card p {
              font-size: 13px;
            }

            .usp-icon {
              font-size: 36px;
              margin-bottom: 12px;
            }

            .footer {
              padding: 40px 20px 20px;
              margin-top: 30px;
            }

            .footer-logo {
              font-size: 28px;
              margin-bottom: 15px;
            }

            .footer-description {
              font-size: 14px;
              margin-bottom: 20px;
            }

            .footer-links {
              gap: 15px;
              margin-bottom: 20px;
            }

            .footer-links a {
              font-size: 13px;
              padding: 5px 10px;
              min-height: 32px;
            }

            .footer-bottom {
              font-size: 12px;
              padding-top: 15px;
            }

            .chatbot-container {
              width: 90%;
              max-height: 60vh;
              bottom: 70px;
              right: 5%;
            }

            .chatbot-button {
              width: 45px;
              height: 45px;
              bottom: 15px;
              right: 15px;
            }

            .chatbot-button svg {
              width: 20px;
              height: 20px;
            }

            .chatbot-header {
              padding: 10px 12px;
            }

            .chatbot-header h3 {
              font-size: 16px;
            }

            .chatbot-header p {
              font-size: 10px;
            }

            .chatbot-messages {
              padding: 12px;
              gap: 8px;
            }

            .message {
              padding: 6px 10px;
              font-size: 12px;
            }

            .chatbot-quick-buttons {
              padding: 6px 12px;
              gap: 6px;
            }

            .quick-button {
              padding: 5px 10px;
              font-size: 11px;
              min-width: 80px;
              min-height: 32px;
            }

            .chatbot-input-container {
              padding: 8px 12px;
            }

            .chatbot-input {
              padding: 6px 10px;
              font-size: 12px;
              min-height: 32px;
            }

            .chatbot-send-button {
              padding: 6px 10px;
              min-height: 32px;
            }
          }

          /* Media Query for Small Mobile Devices (max-width: 480px) */
          @media (max-width: 480px) {
            .header {
              padding: 10px 15px;
              gap: 10px;
            }

            .logo {
              font-size: 18px;
            }

            .logo-symbol {
              width: 35px;
              height: 35px;
              font-size: 18px;
              margin-right: 8px;
            }

            .nav {
              top: 45px;
              padding: 10px;
            }

            .nav a {
              font-size: 12px;
              padding: 6px 12px;
              border-radius: 15px;
              min-height: 36px;
            }

            .profile-icon {
              width: 32px;
              height: 32px;
            }

            .profile-icon svg {
              width: 18px;
              height: 18px;
            }

            .dropdown {
              top: 40px;
              min-width: 140px;
              padding: 10px;
            }

            .dropdown-item {
              padding: 6px 10px;
              font-size: 12px;
            }

            .hero-section {
              padding: 60px 15px;
            }

            .hero-content {
              padding: 15px;
            }

            .hero-content h1 {
              font-size: clamp(24px, 4.5vw, 32px);
              margin-bottom: 12px;
            }

            .hero-content p {
              font-size: clamp(14px, 2.3vw, 16px);
              margin-bottom: 15px;
            }

            .gem-svg {
              width: 100px;
              height: 100px;
              margin-bottom: 10px;
            }

            .section {
              padding: 40px 15px;
              margin-top: 10px;
            }

            .section-title {
              font-size: clamp(24px, 4vw, 28px);
              margin-bottom: 20px;
            }

            .section-title::after {
              width: 60px;
              height: 2px;
            }

            .search-container {
              max-width: 95%;
              margin-bottom: 20px;
            }

            .search-input {
              padding: 8px 12px 8px 35px;
              font-size: 12px;
              border-radius: 20px;
            }

            .search-icon {
              left: 10px;
              font-size: 16px;
            }

            .gemstone-container {
              gap: 15px;
            }

            .gemstone-card {
              padding: 15px;
              max-width: 95%;
              border-radius: 12px;
            }

            .gemstone-card img {
              height: 140px;
              border-radius: 8px;
              margin-bottom: 10px;
            }

            .gemstone-card .gem-icon {
              font-size: 32px;
              margin-bottom: 10px;
            }

            .gemstone-card h3 {
              font-size: 16px;
              margin-bottom: 6px;
            }

            .gemstone-card p {
              font-size: 12px;
              margin-bottom: 6px;
            }

            .gemstone-card .price {
              font-size: 14px;
              margin-bottom: 10px;
            }

            .gemstone-card .buy-button {
              padding: 6px 15px;
              font-size: 12px;
              border-radius: 20px;
              min-height: 32px;
            }

            .usp-card {
              padding: 20px 15px;
              max-width: 95%;
              border-radius: 12px;
            }

            .usp-card h3 {
              font-size: 16px;
              margin-bottom: 6px;
            }

            .usp-card p {
              font-size: 12px;
            }

            .usp-icon {
              font-size: 32px;
              margin-bottom: 10px;
            }

            .footer {
              padding: 30px 15px 15px;
              margin-top: 20px;
            }

            .footer-logo {
              font-size: 24px;
              margin-bottom: 12px;
            }

            .footer-description {
              font-size: 13px;
              margin-bottom: 15px;
            }

            .footer-links {
              gap: 10px;
              margin-bottom: 15px;
            }

            .footer-links a {
              font-size: 12px;
              padding: 4px 8px;
              min-height: 30px;
            }

            .footer-bottom {
              font-size: 11px;
              padding-top: 10px;
            }

            .chatbot-container {
              width: 95%;
              max-height: 50vh;
              bottom: 60px;
              right: 2.5%;
            }

            .chatbot-button {
              width: 40px;
              height: 40px;
              bottom: 10px;
              right: 10px;
            }

            .chatbot-button svg {
              width: 18px;
              height: 18px;
            }

            .chatbot-header {
              padding: 8px 10px;
            }

            .chatbot-header h3 {
              font-size: 14px;
            }

            .chatbot-header p {
              font-size: 9px;
            }

            .chatbot-messages {
              padding: 10px;
              gap: 6px;
            }

            .message {
              padding: 5px 8px;
              font-size: 11px;
            }

            .chatbot-quick-buttons {
              padding: 5px 10px;
              gap: 5px;
            }

            .quick-button {
              padding: 4px 8px;
              font-size: 10px;
              min-width: 70px;
              min-height: 30px;
            }

            .chatbot-input-container {
              padding: 6px 10px;
            }

            .chatbot-input {
              padding: 5px 8px;
              font-size: 11px;
              min-height: 30px;
            }

            .chatbot-send-button {
              padding: 5px 8px;
              min-height: 30px;
            }
          }

          /* Accessibility Enhancements */
          .nav a:focus,
          .dropdown-item:focus,
          .buy-button:focus,
          .quick-button:focus,
          .chatbot-send-button:focus {
            outline: 2px solid #e9c46a;
            outline-offset: 2px;
          }

          .search-input:focus {
            outline: 2px solid #e9c46a;
            outline-offset: 2px;
          }
        `}
      </style>

      <div className="main-container" lang={language}>
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-symbol">🪷</div>
            {translations[language].logo}
          </div>
          <div className="nav-container">
            <div
              className={`hamburger ${isNavOpen ? "open" : ""}`}
              onClick={toggleNav}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className="nav">
              <Link to="/dashboard#home">{translations[language].navHome}</Link>
              <Link to="/dashboard#services">
                {translations[language].navServices}
              </Link>
              <Link to="/dashboard#about">
                {translations[language].navAbout}
              </Link>
              <Link to="/dashboard#contact">
                {translations[language].navContact}
              </Link>
            </nav>
            <div className="user-profile">
              <div className="profile-icon" onClick={toggleDropdown}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
                <Link to="/profile" className="dropdown-item">
                  Complete Profile
                </Link>
                <Link to="/faq" className="dropdown-item">
                  FAQ Section
                </Link>
              </div>
            </div>
            <button
              className="language-btn"
              onClick={toggleLanguage}
              aria-label={
                language === "en" ? "Switch to Hindi" : "Switch to English"
              }
            >
              {language === "en" ? "हिन्दी" : "ENGLISH"}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <svg className="gem-svg" viewBox="0 0 200 200">
              {/* Gemstone Shape */}
              <path
                className="gem-path"
                d="M100 30 L150 60 L130 120 L100 150 L70 120 L50 60 L100 30 M80 80 L120 80 L100 110 L80 80"
                fill="rgba(212, 175, 55, 0.2)"
                stroke="#d4af37"
                strokeWidth="2"
              />
              {/* Sparkle */}
              <path
                className="sparkle"
                d="M100 90 L105 85 L110 90 L105 95 L100 90 M95 90 L90 85 L85 90 L90 95 L95 90"
                fill="#d4af37"
                stroke="#e9c46a"
                strokeWidth="1"
              />
            </svg>
            <h1>{translations[language].heroTitle}</h1>
            <p>{translations[language].heroDescription}</p>
          </div>
        </section>

        {/* Search and Gemstone Catalog */}
        <section className="section">
          <h2 className="section-title">
            {translations[language].sectionTitle}
          </h2>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder={translations[language].searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search gemstones"
            />
          </div>
          <div className="gemstone-container">
            {filteredGemstones.length > 0 ? (
              filteredGemstones.map((gem, index) => (
                <div key={index} className="gemstone-card">
                  <div className="gem-icon">💎</div>
                  <img
                    src={(gem.images && gem.images.length > 0) ? gem.images[0] : (gem.image || "/placeholder.jpg")}
                    alt={language === "en" ? gem.name : gem.name_hi}
                  />
                  <h3>{language === "en" ? gem.name : gem.name_hi}</h3>
                  <p>
                    <strong>{translations[language].planet}</strong>{" "}
                    {language === "en" ? gem.planet : gem.planet_hi}
                  </p>
                  <p>{language === "en" ? gem.benefits : gem.benefits_hi}</p>
                  <p className="price">₹{gem.price}</p>
                  <button className="buy-button" onClick={() => handleBuy(gem)}>
                    {translations[language].buyButton}
                  </button>
                </div>
              ))
            ) : (
              <p
                style={{
                  fontSize: "16px",
                  color: "#d4af37",
                  textAlign: "center",
                }}
              >
                {translations[language].noResults}
              </p>
            )}
          </div>
        </section>

        {/* Why Our Gemstones */}
        <section className="section">
          <h2 className="section-title">{translations[language].uspTitle}</h2>
          <div className="usp-container">
            <div className="usp-card">
              <div className="usp-icon">📜</div>
              <h3>{translations[language].uspAuthenticityTitle}</h3>
              <p>{translations[language].uspAuthenticityDescription}</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">🚚</div>
              <h3>{translations[language].uspDeliveryTitle}</h3>
              <p>{translations[language].uspDeliveryDescription}</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">🕉️</div>
              <h3>{translations[language].uspAlignmentTitle}</h3>
              <p>{translations[language].uspAlignmentDescription}</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              {translations[language].footerLogo}
            </div>
            <p className="footer-description">
              {translations[language].footerDescription}
            </p>
            <div className="footer-links">
              <Link to="/dashboard#about">
                {translations[language].footerAbout}
              </Link>
              <Link to="/dashboard#services">
                {translations[language].footerServices}
              </Link>
              <Link to="/dashboard#contact">
                {translations[language].footerContact}
              </Link>
              <a href="#privacy">{translations[language].footerPrivacy}</a>
              <a href="#terms">{translations[language].footerTerms}</a>
            </div>
            <div className="footer-bottom">
              <p>{translations[language].footerCopyright}</p>
            </div>
          </div>
        </footer>

        {/* Chatbot */}
        <div className="chatbot-button" onClick={toggleChat}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10c-1.91 0-3.69-.55-5.2-1.49l-3.26 1.63a1 1 0 0 1-1.34-1.34l1.63-3.26C2.55 15.69 2 13.91 2 12 2 6.48 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8 0 1.44.38 2.78 1.05 3.95l-.55 1.1 1.1.55c1.17-.67 2.51-1.05 3.95-1.05 4.42 0 8 3.58 8 8s-3.58 8-8 8zm-1 2h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z" />
          </svg>
        </div>
        <div className="chatbot-container">
          <div className="chatbot-header">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10c-1.91 0-3.69-.55-5.2-1.49l-3.26 1.63a1 1 0 0 1-1.34-1.34l1.63-3.26C2.55 15.69 2 13.91 2 12 2 6.48 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8 0 1.44.38 2.78 1.05 3.95l-.55 1.1 1.1.55c1.17-.67 2.51-1.05 3.95-1.05 4.42 0 8 3.58 8 8s-3.58 8-8 8zm-1 2h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z" />
            </svg>
            <div>
              <h3>Jyoti</h3>
              <p>{translations[language].chatbotGemstoneSupport}</p>
            </div>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "You" ? "user" : "bot"}`}
              >
                <strong>{msg.sender}: </strong>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-quick-buttons">
            {quickMessages.map((msg, index) => (
              <button
                key={index}
                className="quick-button"
                onClick={() => sendMessage(msg)}
              >
                {msg}
              </button>
            ))}
          </div>
          <div className="chatbot-input-container">
            <input
              className="chatbot-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={translations[language].chatbotPlaceholder}
              onKeyPress={(e) => {
                if (e.key === "Enter" && userInput.trim()) {
                  sendMessage(userInput);
                }
              }}
            />
            <button
              className="chatbot-send-button"
              onClick={() => {
                if (userInput.trim()) {
                  sendMessage(userInput);
                }
              }}
            >
              {translations[language].chatbotSend}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gemstone;
