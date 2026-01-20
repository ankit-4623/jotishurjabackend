import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Import the image (adjust the path based on your project structure)
import astrologerImage from "./assets/gaurav_sir_large.png";

const translations = {
  en: {
    logo: "JYOTISH URJA",
    navHome: "HOME",
    navAbout: "ABOUT",
    navLogin: "LOGIN",
    heroTitle: "BEST ASTROLOGY SERVICES",
    heroSubtitle: "Unlock the Power of Vedic Astrology",
    getStarted: "GET STARTED",
    getStartedAlert:
      "Welcome to Jyotish Urja! Your spiritual journey begins now.",
    servicesTitle: "OUR SERVICES",
    servicesDescription:
      "Expert consultations on horoscope readings, kundali matching, and more.",
    serviceHoroscope: "HOROSCOPE",
    serviceKundali: "KUNDALI MATCHING",
    servicePalmistry: "PALMISTRY",
    serviceVastu: "VASTU SHASTRA",
    aboutTitle: "ABOUT DR. GAURAV MISHRA",
    aboutText1: `Welcome! I am Dr. Gaurav Mishra, a dedicated Vedic Astrologer with over 20 years of experience in Astrology, Palmistry, and Face Reading. Throughout my journey, I have had the honor of guiding thousands of people across India and around the world, helping them navigate life’s challenges and discover deeper meaning through the ancient wisdom of astrology.`,
    aboutText2: `My approach blends traditional Vedic principles with a practical, compassionate outlook. I believe that astrology is not just about predicting the future — it’s about understanding life’s patterns, making better choices, and finding peace within. The remedies I suggest are simple, effective, and easy to follow, bringing balance and positivity to one’s life.`,
    aboutText3: `Over the years, I have been privileged to participate in numerous astrological conferences and seminars, exchanging knowledge with renowned experts. My contributions to this divine field have been recognized with several prestigious honors, including the Jyotish Bhooshan, Ashwani Nakshatra Award, Vedamratam Award, and Vedang Bhooshan Award, bestowed by eminent astrologers such as Dr. H. S. Rawat, Dr. Ajay Bhambi, and Anil Vats.`,
    aboutText4: `For me, astrology is not merely a profession — it is a service to humanity. I consider it a blessing from God to be able to guide others during their times of uncertainty, helping them find light, purpose, and direction. Every consultation is a sacred opportunity to empower someone to live a more meaningful, peaceful, and fulfilling life.`,
    loadingText: "Jyotish Urja",
    loadingSubtitle: "Awakening the cosmic consciousness within...",
  },
  hi: {
    logo: "ज्योतिष ऊर्जा",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navLogin: "लॉगिन",
    heroTitle: "सर्वश्रेष्ठ ज्योतिष सेवाएँ",
    heroSubtitle: "वैदिक ज्योतिष की शक्ति को अनलॉक करें",
    getStarted: "शुरू करें",
    getStartedAlert:
      "ज्योतिष ऊर्जा में आपका स्वागत है! आपकी आध्यात्मिक यात्रा अब शुरू होती है।",
    servicesTitle: "हमारी सेवाएँ",
    servicesDescription:
      "जन्मकुंडली पढ़ने, कुंडली मिलान और अन्य पर विशेषज्ञ परामर्श।",
    serviceHoroscope: "जन्मकुंडली",
    serviceKundali: "कुंडली मिलान",
    servicePalmistry: "हस्तरेखा",
    serviceVastu: "वास्तु शास्त्र",
    aboutTitle: "डॉ. गौरव मिश्रा के बारे में",
    aboutText1: `नमस्ते! मैं डॉ. गौरव मिश्रा, एक समर्पित वैदिक ज्योतिषी हूँ, जिनके पास ज्योतिष, हस्तरेखा और चेहरा पढ़ने में 20 से अधिक वर्षों का अनुभव है। अपनी यात्रा के दौरान, मुझे भारत और विश्व भर में हजारों लोगों का मार्गदर्शन करने का सम्मान प्राप्त हुआ है, जिससे उन्हें जीवन की चुनौतियों का सामना करने और प्राचीन ज्योतिषीय ज्ञान के माध्यम से गहरे अर्थ की खोज करने में मदद मिली है।`,
    aboutText2: `मेरा दृष्टिकोण पारंपरिक वैदिक सिद्धांतों को व्यावहारिक और करुणामय दृष्टिकोण के साथ मिश्रित करता है। मेरा मानना है कि ज्योतिष केवल भविष्य की भविष्यवाणी करने के बारे में नहीं है — यह जीवन के पैटर्न को समझने, बेहतर विकल्प चुनने और भीतर शांति पाने के बारे में है। मेरे द्वारा सुझाए गए उपाय सरल, प्रभावी और आसान हैं, जो जीवन में संतुलन और सकारात्मकता लाते हैं।`,
    aboutText3: `इन वर्षों में, मुझे कई ज्योतिष सम्मेलनों और सेमिनारों में भाग लेने का सौभाग्य प्राप्त हुआ है, जहां मैंने प्रसिद्ध विशेषज्ञों के साथ ज्ञान का आदान-प्रदान किया। इस दैवीय क्षेत्र में मेरे योगदान को ज्योतिष भूषण, अश्विनी नक्षत्र पुरस्कार, वेदमृतम पुरस्कार और वेदांग भूषण पुरस्कार जैसे कई प्रतिष्ठित सम्मानों के साथ मान्यता मिली है, जो डॉ. एच. एस. रावत, डॉ. अजय भांबी और अनिल वत्स जैसे प्रमुख ज्योतिषियों द्वारा प्रदान किए गए।`,
    aboutText4: `मेरे लिए, ज्योतिष केवल एक पेशा नहीं है — यह मानवता की सेवा है। मैं इसे ईश्वर का आशीर्वाद मानता हूँ कि मैं दूसरों को अनिश्चितता के समय में मार्गदर्शन कर सकता हूँ, उन्हें प्रकाश, उद्देश्य और दिशा खोजने में मदद कर सकता हूँ। प्रत्येक परामर्श एक पवित्र अवसर है जो किसी को अधिक अर्थपूर्ण, शांतिपूर्ण और पूर्ण जीवन जीने के लिए सशक्त बनाता है।`,
    loadingText: "ज्योतिष ऊर्जा",
    loadingSubtitle: "आपके भीतर की ब्रह्मांडीय चेतना को जागृत करना...",
  },
};

const Home = () => {
  const loadingScreenRef = useRef(null);
  const location = useLocation();
  const [language, setLanguage] = useState("en");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    } else {
      console.warn(`Section with ID ${id} not found.`);
    }
    setIsNavOpen(false); // Close nav on mobile after click
  };

  useEffect(() => {
    let particleInterval;

    function createParticles() {
      const loadingScreen = loadingScreenRef.current;
      if (!loadingScreen || window.innerWidth <= 768) return; // Skip particles on mobile

      const particleCount = 15; // Reduced for performance
      for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.width = Math.random() * 5 + 2 + "px";
          particle.style.height = particle.style.width;
          particle.style.animationDelay = Math.random() * 5 + "s";
          particle.style.animationDuration = Math.random() * 2 + 2 + "s";
          loadingScreen.appendChild(particle);
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 5000);
        }, i * 600); // Increased delay
      }

      particleInterval = setInterval(() => {
        if (
          loadingScreen &&
          !loadingScreen.classList.contains("loading-hide")
        ) {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.width = Math.random() * 5 + 2 + "px";
          particle.style.height = particle.style.width;
          particle.style.animationDelay = "0s";
          particle.style.animationDuration = Math.random() * 2 + 2 + "s";
          loadingScreen.appendChild(particle);
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 5000);
        } else {
          clearInterval(particleInterval);
        }
      }, 1500); // Increased interval
    }

    const handleLoad = () => {
      try {
        createParticles();
        setTimeout(() => {
          const loadingScreen = loadingScreenRef.current;
          if (loadingScreen) {
            loadingScreen.classList.add("loading-hide");
            setTimeout(() => {
              loadingScreen.style.display = "none";
            }, 800);
          }
        }, 2500); // Reduced timeout
      } catch (error) {
        console.error("Error in handleLoad:", error);
        const loadingScreen = loadingScreenRef.current;
        if (loadingScreen) {
          loadingScreen.classList.add("loading-hide");
          setTimeout(() => {
            loadingScreen.style.display = "none";
          }, 800);
        }
      }
    };

    window.addEventListener("load", handleLoad);

    // Fallback timeout
    const fallbackTimeout = setTimeout(() => {
      const loadingScreen = loadingScreenRef.current;
      if (loadingScreen && !loadingScreen.classList.contains("loading-hide")) {
        loadingScreen.classList.add("loading-hide");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 800);
      }
    }, 8000);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".fade-in").forEach((el) => {
        el.classList.add("visible");
      });
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const fadeInElements = document.querySelectorAll(".fade-in");
      fadeInElements.forEach((el) => {
        observer.observe(el);
      });

      const onScroll = () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector(".hero");
        if (hero && window.innerWidth > 768) {
          hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
      };
      window.addEventListener("scroll", onScroll);

      if (location.hash) {
        const id = location.hash.replace("#", "");
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("load", handleLoad);
        clearInterval(particleInterval);
        clearTimeout(fallbackTimeout);
        fadeInElements.forEach((el) => observer.unobserve(el));
        observer.disconnect();
      };
    }
  }, [location.hash]);

  const handleGetStarted = (e) => {
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "";
      alert(translations[language].getStartedAlert);
    }, 150);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div lang={language}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600&family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          :root {
            --hero-text-width: 35%;
            --hero-image-width: 60%;
            --hero-image-height: auto;
            --header-height: 80px; /* Desktop header height */
          }

          body {
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Source Sans 3', sans-serif"
            };
            background: linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%);
            color: #faf0e6;
            overflow-x: hidden;
            line-height: 1.6;
          }

          #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(ellipse at center, #1a2332 0%, #0f1419 70%, #000814 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.8s ease;
            overflow: hidden;
            touch-action: manipulation;
          }

          .cosmic-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(1.5px 1.5px at 20px 30px, #d4af37, transparent),
              radial-gradient(1.5px 1.5px at 40px 70px, #d4af37, transparent),
              radial-gradient(1px 1px at 90px 40px, #d4af37, transparent),
              radial-gradient(1px 1px at 130px 80px, #d4af37, transparent),
              radial-gradient(1.5px 1.5px at 160px 30px, #d4af37, transparent);
            background-repeat: repeat;
            background-size: 250px 150px;
            animation: cosmicDrift 40s linear infinite;
            opacity: 0.25;
          }

          @keyframes cosmicDrift {
            0% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(-40px) translateY(-20px); }
            50% { transform: translateX(-80px) translateY(0); }
            75% { transform: translateX(-40px) translateY(20px); }
            100% { transform: translateX(0) translateY(0); }
          }

          .zodiac-wheel {
            width: 250px;
            height: 250px;
            position: relative;
            margin: 0 auto 30px;
            animation: zodiacRotate 10s linear infinite;
          }

          .zodiac-outer {
            width: 100%;
            height: 100%;
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            position: relative;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.15);
          }

          .zodiac-inner {
            width: 80%;
            height: 80%;
            border: 1.5px solid rgba(255, 179, 71, 0.3);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: zodiacRotateReverse 8s linear infinite;
          }

          .zodiac-center {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ffd700, #ffb347);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: #0a1628;
            animation: centerPulse 2.5s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
            z-index: 10;
          }

          @keyframes zodiacRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes zodiacRotateReverse {
            0% { transform: translate(-50%, -50%) rotate(360deg); }
            100% { transform: translate(-50%, -50%) rotate(0deg); }
          }

          @keyframes centerPulse {
            0%, 100% {
              box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              box-shadow: 0 0 45px rgba(255, 215, 0, 0.8);
              transform: translate(-50%, -50%) scale(1.03);
            }
          }

          .zodiac-sign {
            position: absolute;
            width: 35px;
            height: 35px;
            background: linear-gradient(135deg, #e9c46a, #f4a261);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #0d1b2a;
            font-weight: bold;
            animation: signGlow 3.5s ease-in-out infinite;
            box-shadow: 0 0 15px rgba(233, 196, 106, 0.3);
          }

          @keyframes signGlow {
            0%, 100% {
              box-shadow: 0 0 15px rgba(233, 196, 106, 0.3);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 25px rgba(233, 196, 106, 0.6);
              transform: scale(1.03);
            }
          }

          .zodiac-sign:nth-child(1) {
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0s;
          }

          .zodiac-sign:nth-child(2) {
            top: 8px;
            right: 8px;
            animation-delay: 0.5s;
          }

          .zodiac-sign:nth-child(3) {
            top: 50%;
            right: -15px;
            transform: translateY(-50%);
            animation-delay: 1s;
          }

          .zodiac-sign:nth-child(4) {
            bottom: 8px;
            right: 8px;
            animation-delay: 1.5s;
          }

          .zodiac-sign:nth-child(5) {
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 2s;
          }

          .zodiac-sign:nth-child(6) {
            bottom: 8px;
            left: 8px;
            animation-delay: 2.5s;
          }

          .zodiac-sign:nth-child(7) {
            top: 50%;
            left: -15px;
            transform: translateY(-50%);
            animation-delay: 0.25s;
          }

          .zodiac-sign:nth-child(8) {
            top: 8px;
            left: 8px;
            animation-delay: 0.75s;
          }

          .mystical-text {
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Playfair Display', serif"
            };
            font-size: clamp(36px, 6vw, 48px);
            font-weight: 800;
            background: linear-gradient(45deg, #e9c46a, #f4a261, #e76f51, #2a9d8f);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: textShimmer 4.5s ease-in-out infinite;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 15px;
            text-align: center;
          }

          @keyframes textShimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .particle {
            position: absolute;
            background: radial-gradient(circle, #e9c46a, transparent);
            border-radius: 50%;
            animation: floatUp 5s linear infinite;
            opacity: 0;
          }

          @keyframes floatUp {
            0% { opacity: 0; transform: translateY(100vh) scale(0); }
            10% { opacity: 0.8; transform: translateY(90vh) scale(0.8); }
            90% { opacity: 0.8; transform: translateY(10vh) scale(0.8); }
            100% { opacity: 0; transform: translateY(0) scale(0); }
          }

          .cosmic-subtitle {
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Crimson Text', serif"
            };
            font-size: clamp(18px, 3vw, 22px);
            color: rgba(250, 240, 230, 0.8);
            margin-bottom: 30px;
            font-style: italic;
            text-align: center;
            animation: subtitleFade 4.5s ease-in-out infinite;
          }

          @keyframes subtitleFade {
            0%, 100% { opacity: 0.7; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
          }

          .crystal-progress {
            width: 350px;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
            box-shadow: 0 0 15px rgba(233, 196, 106, 0.2);
          }

          .crystal-progress-fill {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #e9c46a, #f4a261, #e76f51, #2a9d8f);
            background-size: 200% 100%;
            border-radius: 3px;
            animation: crystalProgress 3.5s ease-out forwards, crystalShine 2.5s linear infinite;
            box-shadow: 0 0 10px rgba(233, 196, 106, 0.5);
          }

          @keyframes crystalProgress {
            0% { width: 0%; }
            25% { width: 30%; }
            50% { width: 60%; }
            75% { width: 85%; }
            100% { width: 100%; }
          }

          @keyframes crystalShine {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          .sacred-geometry {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 500px;
            opacity: 0.08;
            z-index: -1;
          }

          .geometry-line {
            position: absolute;
            background: linear-gradient(90deg, transparent, #e9c46a, transparent);
            height: 1.5px;
            animation: geometryPulse 9s ease-in-out infinite;
          }

          .geometry-line:nth-child(1) {
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            animation-delay: 0s;
          }

          .geometry-line:nth-child(2) {
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%) rotate(60deg);
            animation-delay: 0.5s;
          }

          .geometry-line:nth-child(3) {
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%) rotate(120deg);
            animation-delay: 1s;
          }

          @keyframes geometryPulse {
            0%, 100% { opacity: 0.08; }
            50% { opacity: 0.2; }
          }

          .loading-hide {
            opacity: 0;
            visibility: hidden;
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
              radial-gradient(1px 1px at 130px 80px, #fff, transparent);
            background-repeat: repeat;
            background-size: 180px 90px;
            animation: twinkle 25s infinite;
            pointer-events: none;
            z-index: 0;
            opacity: 0.25;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.25; }
            50% { opacity: 0.6; }
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
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
            font-family: ${
              language === "hi"
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
            background: transparent;
            border: 2px solid #d4af37;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 12px;
            font-size: 14px;
            color: #d4af37;
            position: relative;
            animation: glow 3.5s ease-in-out infinite alternate;
          }

          .logo-symbol::before {
            content: '🔱';
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
          }

          .logo-symbol::after {
            content: '⚡';
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 8px;
          }

          @keyframes glow {
            0% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.2); }
            100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
          }

          .nav-container {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          nav {
            display: flex;
            gap: 10px;
          }

          nav a {
            color: #d4af37;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            padding: 10px 20px;
            border: 2px solid transparent;
            border-radius: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Source Sans 3', sans-serif"
            };
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          nav a::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
            transition: left 0.5s;
          }

          nav a:hover::before {
            left: 100%;
          }

          nav a:hover {
            border-color: #d4af37;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.2);
          }

          nav a:last-child {
            background: #d4af37;
            color: #1a2332;
            font-weight: 600;
            border: 2px solid #d4af37;
          }

          nav a:last-child:hover {
            background: rgba(212, 175, 55, 0.9);
            transform: translateY(-2px) scale(1.05);
          }

          .language-btn {
            background: ${
              language === "hi" ? "#d4af37" : "rgba(55, 65, 81, 0.8)"
            };
            color: ${language === "hi" ? "#1a2332" : "#faf0e6"};
            border: 2px solid rgba(212, 175, 55, 0.3);
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Source Sans 3', sans-serif"
            };
            position: relative;
            overflow: hidden;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .language-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
          }

          .language-btn:hover::before {
            left: 100%;
          }

          .language-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.2);
            background: ${
              language === "hi"
                ? "rgba(212, 175, 55, 0.9)"
                : "rgba(55, 65, 81, 0.9)"
            };
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

          .hero,
          .services,
          .about {
            padding-top: var(--header-height); /* Prevent content from hiding under fixed header */
          }

          .hero {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 80px 40px 0;
            min-height: 100vh;
            position: relative;
            z-index: 5;
          }

          .hero-text {
            max-width: var(--hero-text-width);
            animation: slideInLeft 0.8s ease-out;
          }

          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-30px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .hero-text h1 {
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Playfair Display', serif"
            };
            font-size: clamp(36px, 7vw, 64px);
            font-weight: 800;
            margin: 0;
            line-height: 1.1;
            text-transform: uppercase;
            color: #d4af37;
            margin-bottom: 15px;
            text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            letter-spacing: 0.8px;
          }

          .hero-text h2 {
            font-size: clamp(20px, 3.5vw, 28px);
            font-weight: 400;
            margin: 15px 0 30px;
            color: #d4af37;
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Crimson Text', serif"
            };
            font-style: italic;
            line-height: 1.4;
          }

          .hero-text button {
            background: #d4af37;
            color: #1a2332;
            border: none;
            padding: 14px 30px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Source Sans 3', sans-serif"
            };
            min-height: 44px;
          }

          .hero-text button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
          }

          .hero-text button:hover::before {
            left: 100%;
          }

          .hero-text button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
            background: rgba(212, 175, 55, 0.9);
          }

          .hero-image {
            max-width: var(--hero-image-width);
            height: var(--hero-image-height);
            border-radius: 0;
            box-shadow: none;
            animation: slideInRight 0.8s ease-out;
            position: relative;
          }

          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(30px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .services {
            text-align: center;
            padding: 80px 40px;
            position: relative;
            z-index: 5;
            background: rgba(26, 35, 50, 0.7);
            backdrop-filter: blur(8px);
            margin-top: 0;
          }

          .services::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
          }

          .services h2 {
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Playfair Display', serif"
            };
            font-size: clamp(28px, 5vw, 44px);
            font-weight: 700;
            margin: 0 0 15px 0;
            text-transform: uppercase;
            color: #d4af37;
            letter-spacing: 1.5px;
          }

          .services>p {
            font-size: clamp(16px, 2.5vw, 18px);
            margin: 15px 0 40px;
            color: #d4af37;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Source Sans 3', sans-serif"
            };
            font-weight: 400;
          }

          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            max-width: 900px;
            margin: 0 auto;
          }

          .service-item {
            background: rgba(26, 35, 50, 0.85);
            backdrop-filter: blur(8px);
            padding: 30px 15px;
            border-radius: 15px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(212, 175, 55, 0.2);
            position: relative;
            overflow: hidden;
          }

          .service-item::before {
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

          .service-item:hover::before {
            left: 0;
          }

          .service-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.2);
            border-color: rgba(212, 175, 55, 0.3);
          }

          .service-icon {
            font-size: 40px;
            margin-bottom: 15px;
            color: #d4af37;
            transition: all 0.3s ease;
          }

          .service-item:hover .service-icon {
            transform: scale(1.15);
            color: #d4af37;
          }

          .service-item p {
            font-size: 14px;
            font-weight: 600;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #d4af37;
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Source Sans 3', sans-serif"
            };
          }

          .about {
            text-align: center;
            padding: 80px 40px;
            position: relative;
            z-index: 5;
            background: rgba(26, 35, 50, 0.7);
            backdrop-filter: blur(8px);
          }

          .about::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
          }

          .about h2 {
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Playfair Display', serif"
            };
            font-size: clamp(28px, 5vw, 44px);
            font-weight: 700;
            margin: 0 0 15px 0;
            text-transform: uppercase;
            color: #d4af37;
            letter-spacing: 1.5px;
          }

          .about p {
            font-size: clamp(16px, 2.5vw, 18px);
            margin: 15px 0;
            color: #d4af37;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
            font-family: ${
              language === "hi"
                ? "'Noto Serif Devanagari', serif"
                : "'Source Sans 3', sans-serif"
            };
            font-weight: 400;
          }

          /* Media Query for Tablets (max-width: 768px) */
          @media (max-width: 768px) {
            :root {
              --header-height: 60px; /* Tablet header height */
            }

            #loading-screen {
              background: #0f1419;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
            .cosmic-bg,
            .sacred-geometry,
            .particle {
              display: none;
            }
            .zodiac-wheel {
              width: 200px;
              height: 200px;
              margin-bottom: 20px;
              animation: zodiacRotate 12s linear infinite;
            }
            .zodiac-outer {
              border: 1.5px solid rgba(255, 215, 0, 0.25);
              box-shadow: 0 0 15px rgba(255, 215, 0, 0.2), inset 0 0 15px rgba(255, 215, 0, 0.1);
            }
            .zodiac-inner {
              border: 1px solid rgba(255, 179, 71, 0.25);
              animation: zodiacRotateReverse 10s linear infinite;
            }
            .zodiac-center {
              width: 60px;
              height: 60px;
              font-size: 20px;
              box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            }
            .zodiac-sign {
              width: 30px;
              height: 30px;
              font-size: 16px;
              box-shadow: 0 0 10px rgba(233, 196, 106, 0.2);
            }
            .mystical-text {
              font-size: clamp(28px, 5vw, 36px);
              margin-bottom: 12px;
              letter-spacing: 2px;
            }
            .cosmic-subtitle {
              font-size: clamp(16px, 2.5vw, 18px);
              margin-bottom: 20px;
            }
            .crystal-progress {
              width: 250px;
              height: 5px;
              box-shadow: 0 0 10px rgba(233, 196, 106, 0.15);
            }
            .crystal-progress-fill {
              box-shadow: 0 0 8px rgba(233, 196, 106, 0.4);
            }
            body::before {
              background-size: 150px 80px;
              opacity: 0.2;
            }
            header {
              padding: 15px 20px;
              flex-direction: column;
              gap: 15px;
              min-height: 60px;
            }
            .logo {
              font-size: 20px;
            }
            .logo-symbol {
              width: 40px;
              height: 40px;
              font-size: 12px;
              margin-right: 10px;
            }
            .logo-symbol::before {
              top: -5px;
              font-size: 9px;
            }
            .logo-symbol::after {
              bottom: -5px;
              font-size: 7px;
            }
            .hamburger {
              display: flex;
            }
            .nav-container {
              width: 100%;
              justify-content: space-between;
              align-items: center;
            }
            nav {
              display: ${isNavOpen ? "flex" : "none"};
              flex-direction: column;
              gap: 8px;
              width: 100%;
              background: rgba(26, 35, 50, 0.9);
              padding: 15px;
              position: absolute;
              top: 60px;
              left: 0;
              border-radius: 0 0 10px 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            }
            nav a {
              font-size: 13px;
              padding: 8px 15px;
              border-radius: 18px;
              min-height: 40px;
              text-align: center;
            }
            .language-btn {
              font-size: 13px;
              padding: 8px 15px;
              border-radius: 18px;
              min-height: 40px;
            }
            .hero {
              flex-direction: column;
              padding: 80px 20px 40px;
              text-align: center;
              gap: 15px;
              align-items: center;
            }
            .hero-text {
              max-width: 100%;
            }
            .hero-text h1 {
              font-size: clamp(32px, 6vw, 56px);
              margin-bottom: 12px;
              line-height: 1.2;
            }
            .hero-text h2 {
              font-size: clamp(18px, 3vw, 24px);
              margin: 12px 0 20px;
            }
            .hero-text button {
              padding: 12px 25px;
              font-size: 13px;
              border-radius: 20px;
              min-height: 40px;
            }
            .hero-image {
              max-width: 100%;
              height: auto;
              content: url("./assets/gaurav_sir_small.png");
            }
            .services,
            .about {
              padding: 80px 20px;
            }
            .services h2,
            .about h2 {
              font-size: clamp(24px, 4.5vw, 36px);
              margin-bottom: 12px;
            }
            .services>p,
            .about p {
              font-size: clamp(14px, 2.3vw, 16px);
              margin: 12px 0 30px;
              max-width: 90%;
            }
            .services-grid {
              grid-template-columns: 1fr;
              gap: 15px;
              max-width: 100%;
            }
            .service-item {
              padding: 25px 15px;
              border-radius: 12px;
            }
            .service-icon {
              font-size: 36px;
              margin-bottom: 12px;
            }
            .service-item p {
              font-size: 13px;
            }
          }

          /* Media Query for Small Mobile Devices (max-width: 480px) */
          @media (max-width: 480px) {
            :root {
              --header-height: 50px; /* Small mobile header height */
            }

            #loading-screen {
              background: #0f1419;
            }
            .zodiac-wheel {
              width: 150px;
              height: 150px;
              margin-bottom: 15px;
              animation: zodiacRotate 14s linear infinite;
            }
            .zodiac-outer {
              border: 1px solid rgba(255, 215, 0, 0.2);
              box-shadow: 0 0 10px rgba(255, 215, 0, 0.15), inset 0 0 10px rgba(255, 215, 0, 0.08);
            }
            .zodiac-inner {
              border: 0.8px solid rgba(255, 179, 71, 0.2);
              animation: zodiacRotateReverse 12s linear infinite;
            }
            .zodiac-center {
              width: 50px;
              height: 50px;
              font-size: 16px;
              box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
            }
            .zodiac-sign {
              width: 25px;
              height: 25px;
              font-size: 14px;
              box-shadow: 0 0 8px rgba(233, 196, 106, 0.15);
            }
            .mystical-text {
              font-size: clamp(24px, 4.5vw, 32px);
              margin-bottom: 10px;
              letter-spacing: 1.5px;
            }
            .cosmic-subtitle {
              font-size: clamp(14px, 2.3vw, 16px);
              margin-bottom: 15px;
            }
            .crystal-progress {
              width: 200px;
              height: 4px;
              box-shadow: 0 0 8px rgba(233, 196, 106, 0.1);
            }
            .crystal-progress-fill {
              box-shadow: 0 0 6px rgba(233, 196, 106, 0.3);
            }
            body::before {
              background-size: 120px 70px;
              opacity: 0.15;
            }
            header {
              padding: 10px 15px;
              gap: 10px;
              min-height: 50px;
            }
            .logo {
              font-size: 18px;
            }
            .logo-symbol {
              width: 35px;
              height: 35px;
              font-size: 10px;
              margin-right: 8px;
            }
            .logo-symbol::before {
              top: -4px;
              font-size: 8px;
            }
            .logo-symbol::after {
              bottom: -4px;
              font-size: 6px;
            }
            nav {
              top: 50px;
              padding: 10px;
            }
            nav a {
              font-size: 12px;
              padding: 6px 12px;
              border-radius: 15px;
              min-height: 36px;
            }
            .language-btn {
              font-size: 12px;
              padding: 6px 12px;
              border-radius: 15px;
              min-height: 36px;
            }
            .hero {
              padding: 70px 15px 30px;
              gap: 12px;
            }
            .hero-text h1 {
              font-size: clamp(28px, 5.5vw, 48px);
              margin-bottom: 10px;
            }
            .hero-text h2 {
              font-size: clamp(16px, 2.8vw, 20px);
              margin: 10px 0 15px;
            }
            .hero-text button {
              padding: 10px 20px;
              font-size: 12px;
              border-radius: 18px;
              min-height: 36px;
            }
            .services,
            .about {
              padding: 70px 15px;
            }
            .services h2,
            .about h2 {
              font-size: clamp(20px, 4vw, 32px);
              margin-bottom: 10px;
            }
            .services>p,
            .about p {
              font-size: clamp(13px, 2.2vw, 15px);
              margin: 10px 0 20px;
              max-width: 95%;
            }
            .services-grid {
              gap: 12px;
            }
            .service-item {
              padding: 20px 12px;
              border-radius: 10px;
            }
            .service-icon {
              font-size: 32px;
              margin-bottom: 10px;
            }
            .service-item p {
              font-size: 12px;
            }
          }

          /* Accessibility Enhancements */
          nav a:focus,
          .hero-text button:focus,
          .language-btn:focus {
            outline: 2px solid #e9c46a;
            outline-offset: 2px;
          }

          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
          }

          .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
      <div id="loading-screen" ref={loadingScreenRef}>
        <div className="cosmic-bg"></div>
        <div className="sacred-geometry">
          <div className="geometry-line"></div>
          <div className="geometry-line"></div>
          <div className="geometry-line"></div>
        </div>
        <div className="zodiac-wheel">
          <div className="zodiac-outer">
            <div
              className="zodiac-sign"
              aria-label={language === "hi" ? "मेष" : "Aries"}
            >
              ♈
            </div>
            <div
              className="zodiac-sign"
              aria-label={language === "hi" ? "वृषभ" : "Taurus"}
            >
              ♉
            </div>
            <div
              className="zodiac-sign"
              aria-label={language === "hi" ? "मिथुन" : "Gemini"}
            >
              ♊
            </div>
            <div
              className="zodiac-sign"
              aria-label={language === "hi" ? "कर्क" : "Cancer"}
            >
              ♋
            </div>
            <div
              className="zodiac-sign"
              aria-label={language === "hi" ? "सिंह" : "Leo"}
            >
              ♌
            </div>
            <div
              className="zodiac-sign"
              aria-label={language === "hi" ? "कन्या" : "Virgo"}
            >
              ♍
            </div>
            <div
              className="zodiac-sign"
              aria-label={language === "hi" ? "तुला" : "Libra"}
            >
              ♎
            </div>
            <div
              className="zodiac-sign"
              aria-label={language === "hi" ? "वृश्चिक" : "Scorpio"}
            >
              ♏
            </div>
            <div className="zodiac-inner"></div>
            <div className="zodiac-center">ॐ</div>
          </div>
        </div>
        <div className="mystical-text">
          {translations[language].loadingText}
        </div>
        <div className="cosmic-subtitle">
          {translations[language].loadingSubtitle}
        </div>
        <div className="crystal-progress">
          <div className="crystal-progress-fill"></div>
        </div>
      </div>

      <header>
        <div className="logo">
          <div className="logo-symbol" aria-label="Jyotish Urja Symbol">
            ॐ
          </div>
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
          <nav>
            <Link
              to="/#home"
              onClick={(e) => handleNavClick(e, "home")}
              aria-label={translations[language].navHome}
            >
              {translations[language].navHome}
            </Link>
            <Link
              to="/#about"
              onClick={(e) => handleNavClick(e, "about")}
              aria-label={translations[language].navAbout}
            >
              {translations[language].navAbout}
            </Link>
            <Link to="/login" aria-label={translations[language].navLogin}>
              {translations[language].navLogin}
            </Link>
          </nav>
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

      <section className="hero" id="home" lang={language}>
        <div className="hero-text">
          <h1>{translations[language].heroTitle}</h1>
          <h2>{translations[language].heroSubtitle}</h2>
          <button
            id="getStartedBtn"
            onClick={handleGetStarted}
            aria-label={translations[language].getStarted}
          >
            {translations[language].getStarted}
          </button>
        </div>
        <img
          className="hero-image"
          src={astrologerImage}
          alt={
            language === "hi"
              ? "विशेषज्ञ वैदिक ज्योतिषी"
              : "Expert Vedic Astrologer"
          }
          loading="lazy"
        />
      </section>

      <section className="services fade-in" lang={language}>
        <h2>{translations[language].servicesTitle}</h2>
        <p>{translations[language].servicesDescription}</p>
        <div className="services-grid">
          <div className="service-item fade-in">
            <div className="service-icon" aria-hidden="true">
              ⭕
            </div>
            <p>{translations[language].serviceHoroscope}</p>
          </div>
          <div className="service-item fade-in">
            <div className="service-icon" aria-hidden="true">
              ◇
            </div>
            <p>{translations[language].serviceKundali}</p>
          </div>
          <div className="service-item fade-in">
            <div className="service-icon" aria-hidden="true">
              🖐️
            </div>
            <p>{translations[language].servicePalmistry}</p>
          </div>
          <div className="service-item fade-in">
            <div className="service-icon" aria-hidden="true">
              🏛️
            </div>
            <p>{translations[language].serviceVastu}</p>
          </div>
        </div>
      </section>

      <section className="about fade-in" id="about" lang={language}>
        <h2>{translations[language].aboutTitle}</h2>
        <p>{translations[language].aboutText1}</p>
        <p>{translations[language].aboutText2}</p>
        <p>{translations[language].aboutText3}</p>
        <p>{translations[language].aboutText4}</p>
      </section>
    </div>
  );
};

export default Home;
