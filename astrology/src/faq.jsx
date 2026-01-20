
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

const translations = {
  en: {
    logo: "JYOTISH URJA",
    navHome: "HOME",
    navServices: "SERVICES",
    navAbout: "ABOUT",
    navContact: "CONTACT",
    sectionTitle: "Frequently Asked Questions",
    faq1Question: "What is Vedic Astrology?",
    faq1Answer: "Vedic Astrology, also known as Jyotish, is an ancient Indian system of astrology that uses planetary positions and their influence on human life to provide insights and guidance. It is based on the Vedas and considers the fixed zodiac for accurate predictions.",
    faq2Question: "How can I book a consultation?",
    faq2Answer: "You can book a consultation through our website by navigating to the Services section and selecting either a Voice Call, Video Call, or Offline Consultation. Follow the prompts to schedule a session with one of our expert astrologers.",
    faq3Question: "Are the gemstones authentic?",
    faq3Answer: "Yes, all gemstones offered through Jyotish Urja are certified and authentic, carefully selected to align with your astrological needs and planetary positions.",
    faq4Question: "How do I complete my profile?",
    faq4Answer: "To complete your profile, click on the profile icon in the top-right corner and select 'Complete Profile.' Fill out the form with your name, date of birth, time of birth, place of birth, and gender, then click 'Save Profile.'",
    faq5Question: "What are the benefits of a free Kundali?",
    faq5Answer: "A free Kundali provides a detailed birth chart based on your birth details, offering insights into your personality, career, relationships, and life path according to Vedic astrology principles.",
    footerLogo: "Jyotish Urja",
    footerDescription: "Guiding you through the ancient wisdom of Vedic Astrology with personalized insights and spiritual guidance for a meaningful life journey.",
    footerAbout: "About Us",
    footerServices: "Services",
    footerContact: "Contact",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCopyright: "© 2025 Jyotish Urja. All rights reserved. | Designed with cosmic energy ✨",
    profileComplete: "Complete Profile",
    profileFAQ: "FAQ Section",
  },
  hi: {
    logo: "ज्योतिष ऊर्जा",
    navHome: "होम",
    navServices: "सेवाएँ",
    navAbout: "हमारे बारे में",
    navContact: "संपर्क",
    sectionTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faq1Question: "वैदिक ज्योतिष क्या है?",
    faq1Answer: "वैदिक ज्योतिष, जिसे ज्योतिष के नाम से भी जाना जाता है, एक प्राचीन भारतीय ज्योतिष प्रणाली है जो ग्रहों की स्थिति और उनके मानव जीवन पर प्रभाव का उपयोग करके अंतर्दृष्टि और मार्गदर्शन प्रदान करती है। यह वेदों पर आधारित है और सटीक भविष्यवाणियों के लिए स्थिर राशि चक्र को ध्यान में रखता है।",
    faq2Question: "मैं परामर्श कैसे बुक कर सकता हूँ?",
    faq2Answer: "आप हमारी वेबसाइट के माध्यम से सेवाएँ अनुभाग में जाकर और वॉइस कॉल, वीडियो कॉल, या ऑफलाइन परामर्श का चयन करके परामर्श बुक कर सकते हैं। हमारे विशेषज्ञ ज्योतिषियों में से एक के साथ सत्र शेड्यूल करने के लिए संकेतों का पालन करें।",
    faq3Question: "क्या रत्न प्रामाणिक हैं?",
    faq3Answer: "हाँ, ज्योतिष ऊर्जा के माध्यम से पेश किए गए सभी रत्न प्रमाणित और प्रामाणिक हैं, जो आपकी ज्योतिषीय आवश्यकताओं और ग्रहों की स्थिति के साथ संरेखित करने के लिए सावधानी से चुने गए हैं।",
    faq4Question: "मैं अपनी प्रोफाइल कैसे पूरी करूँ?",
    faq4Answer: "अपनी प्रोफाइल पूरी करने के लिए, ऊपरी-दाएँ कोने में प्रोफाइल आइकन पर क्लिक करें और 'प्रोफाइल पूरी करें' चुनें। फॉर्म में अपना नाम, जन्म तिथि, जन्म समय, जन्म स्थान और लिंग भरें, फिर 'प्रोफाइल सहेजें' पर क्लिक करें।",
    faq5Question: "मुफ्त कुंडली के क्या लाभ हैं?",
    faq5Answer: "मुफ्त कुंडली आपके जन्म विवरण के आधार पर वैदिक ज्योतिष सिद्धांतों के अनुसार आपके व्यक्तित्व, करियर, रिश्तों और जीवन पथ में अंतर्दृष्टि प्रदान करने वाली एक विस्तृत जन्म कुंडली प्रदान करती है।",
    footerLogo: "ज्योतिष ऊर्जा",
    footerDescription: "वैदिक ज्योतिष की प्राचीन बुद्धिमत्ता के माध्यम से व्यक्तिगत अंतर्दृष्टि और आध्यात्मिक मार्गदर्शन के साथ आपकी सार्थक जीवन यात्रा में मार्गदर्शन।",
    footerAbout: "हमारे बारे में",
    footerServices: "सेवाएँ",
    footerContact: "संपर्क",
    footerPrivacy: "गोपनीयता नीति",
    footerTerms: "सेवा की शर्तें",
    footerCopyright: "© 2025 ज्योतिष ऊर्जा। सभी अधिकार सुरक्षित। | ब्रह्मांडीय ऊर्जा से डिज़ाइन किया गया ✨",
    profileComplete: "प्रोफाइल पूरी करें",
    profileFAQ: "अक्सर पूछे जाने वाले प्रश्न अनुभाग",
  },
};

const FAQ = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Source Sans 3', sans-serif"};
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
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif"};
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
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Source Sans 3', sans-serif"};
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
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Source Sans 3', sans-serif"};
          }

          .dropdown-item:hover {
            background: rgba(212, 175, 55, 0.1);
            transform: translateX(5px);
            border-color: rgba(212, 175, 55, 0.2);
          }

          .dropdown-item.disabled {
            cursor: default;
            opacity: 0.7;
          }

          .section {
            padding: 80px 40px;
            position: relative;
            z-index: 5;
            background: rgba(26, 35, 50, 0.7);
            backdrop-filter: blur(8px);
            margin-top: 80px;
            border-radius: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
          }

          .section-title {
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif"};
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

          .faq-container {
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
          }

          .faq-item {
            background: rgba(26, 35, 50, 0.9);
            backdrop-filter: blur(8px);
            padding: 20px 25px;
            border-radius: 12px;
            margin-bottom: 15px;
            border: 1px solid rgba(212, 175, 55, 0.2);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .faq-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
            border-color: rgba(212, 175, 55, 0.4);
          }

          .faq-item::before {
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

          .faq-item:hover::before {
            left: 0;
          }

          .faq-question {
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif"};
            font-size: 20px;
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .faq-answer {
            font-size: 15px;
            color: rgba(212, 175, 55, 0.9);
            line-height: 1.6;
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Source Sans 3', sans-serif"};
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
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif"};
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
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Source Sans 3', sans-serif"};
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
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Source Sans 3', sans-serif"};
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
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Source Sans 3', sans-serif"};
          }

          .language-btn {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            color: #1a2332;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-family: ${language === "hi" ? "'Noto Serif Devanagari', serif" : "'Source Sans 3', sans-serif"};
          }

          .language-btn:hover {
            background: linear-gradient(135deg, #e9c46a, #d4af37);
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
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

            .section {
              padding: 60px 20px;
              margin-top: 60px;
            }

            .section-title {
              font-size: clamp(28px, 4.5vw, 32px);
              margin-bottom: 30px;
            }

            .section-title::after {
              width: 60px;
              height: 2px;
            }

            .faq-container {
              max-width: 90%;
            }

            .faq-item {
              padding: 15px 20px;
              border-radius: 10px;
              margin-bottom: 10px;
            }

            .faq-question {
              font-size: 18px;
              margin-bottom: 8px;
            }

            .faq-answer {
              font-size: 14px;
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
            }

            .footer-bottom {
              font-size: 12px;
              padding-top: 15px;
            }

            .language-btn {
              padding: 6px 12px;
              font-size: 13px;
              border-radius: 18px;
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

            .section {
              padding: 40px 15px;
              margin-top: 50px;
            }

            .section-title {
              font-size: clamp(24px, 4vw, 28px);
              margin-bottom: 20px;
            }

            .section-title::after {
              width: 60px;
              height: 2px;
            }

            .faq-container {
              max-width: 95%;
            }

            .faq-item {
              padding: 12px 15px;
              border-radius: 8px;
              margin-bottom: 8px;
            }

            .faq-question {
              font-size: 16px;
              margin-bottom: 6px;
            }

            .faq-answer {
              font-size: 13px;
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
            }

            .footer-bottom {
              font-size: 11px;
              padding-top: 10px;
            }

            .language-btn {
              padding: 5px 10px;
              font-size: 12px;
              border-radius: 15px;
            }
          }

          /* Accessibility Enhancements */
          .nav a:focus,
          .dropdown-item:focus,
          .language-btn:focus {
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
            <div className={`hamburger ${isNavOpen ? "open" : ""}`} onClick={toggleNav}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className="nav">
              <Link to="/dashboard">{translations[language].navHome}</Link>
              <Link to="/dashboard#services">{translations[language].navServices}</Link>
              <Link to="/dashboard#about">{translations[language].navAbout}</Link>
              <Link to="/dashboard#contact">{translations[language].navContact}</Link>
            </nav>
            <div className="user-profile">
              <div className="profile-icon" onClick={toggleDropdown}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
                <Link to="/profile" className="dropdown-item">
                  {translations[language].profileComplete}
                </Link>
                <span className="dropdown-item disabled">
                  {translations[language].profileFAQ}
                </span>
              </div>
            </div>
            <button
              className="language-btn"
              onClick={toggleLanguage}
              aria-label={language === "en" ? "Switch to Hindi" : "Switch to English"}
            >
              {language === "en" ? "हिन्दी" : "ENGLISH"}
            </button>
          </div>
        </header>

        {/* FAQ Section */}
        <section className="section" id="faq">
          <h2 className="section-title">{translations[language].sectionTitle}</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3 className="faq-question">{translations[language].faq1Question}</h3>
              <p className="faq-answer">{translations[language].faq1Answer}</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">{translations[language].faq2Question}</h3>
              <p className="faq-answer">{translations[language].faq2Answer}</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">{translations[language].faq3Question}</h3>
              <p className="faq-answer">{translations[language].faq3Answer}</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">{translations[language].faq4Question}</h3>
              <p className="faq-answer">{translations[language].faq4Answer}</p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">{translations[language].faq5Question}</h3>
              <p className="faq-answer">{translations[language].faq5Answer}</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">{translations[language].footerLogo}</div>
            <p className="footer-description">
              {translations[language].footerDescription}
            </p>
            <div className="footer-links">
              <Link to="/dashboard#about">{translations[language].footerAbout}</Link>
              <Link to="/dashboard#services">{translations[language].footerServices}</Link>
              <Link to="/dashboard#contact">{translations[language].footerContact}</Link>
              <a href="#privacy">{translations[language].footerPrivacy}</a>
              <a href="#terms">{translations[language].footerTerms}</a>
            </div>
            <div className="footer-bottom">
              <p>{translations[language].footerCopyright}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FAQ;
