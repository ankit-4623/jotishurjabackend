"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser, createConsultancyRequest } from "./api/api";
import heroImage from "./assets/gaurav sir background.png";
import diwaliBanner from "./assets/diwali-astrology-offer-banner.jpg";
import gemstoneBanner from "./assets/gemstone-collection-banner.jpg";
import pujaBanner from "./assets/puja-services-banner.jpg";

const translations = {
  en: {
    logo: "JYOTISH URJA",
    nav_home: "HOME",
    nav_services: "SERVICES",
    nav_about: "ABOUT",
    nav_contact: "CONTACT",
    nav_gallery: "GALLERY",
    dropdown_profile: "Complete Profile",
    dropdown_faq: "FAQ Section",
    hero_title: "Welcome to Your Spiritual Journey",
    hero_quote:
      "The stars impel, they do not compel. What we make of our lives is up to us.",
    hero_author: "- Ancient Vedic Wisdom",
    slideshow_title: "Special Offers",
    slide_1_title: "Special Diwali Offer",
    slide_1_subtitle: "50% Off on All Consultations",
    slide_2_title: "Gemstone Collection",
    slide_2_subtitle: "Authentic Certified Gemstones",
    slide_3_title: "Puja Services",
    slide_3_subtitle: "Book Your Sacred Rituals",
    consultation_title: "Consultation Services",
    voice_call_title: "Voice Call",
    voice_call_desc:
      "Connect with our expert astrologers through voice consultation for personalized guidance.",
    voice_call_button: "Know More",
    video_call_title: "Video Call",
    video_call_desc:
      "Face-to-face consultation with detailed chart analysis and visual guidance.",
    video_call_button: "Know More",
    offline_call_title: "Offline Consultation",
    offline_call_desc:
      "Visit our center for in-person consultation with comprehensive analysis.",
    offline_call_button: "Know More",
    gemstone_title: "Gemstone Collection",
    gemstone_card_title: "Purchase Your Gemstone",
    gemstone_card_desc:
      "Discover authentic, certified gemstones recommended by our expert astrologers for your specific needs and planetary positions.",
    gemstone_card_button: "View Collection",
    puja_title: "Puja Services",
    puja_card_title: "Book Your Puja",
    puja_card_desc:
      "Sacred rituals and ceremonies performed by experienced priests to bring peace, prosperity, and positive energy into your life.",
    puja_card_button: "Book Now",
    astro_solutions_title: "Astro Solutions & Remedies",
    astro_solutions_card_title: "Explore Astro Remedies",
    astro_solutions_card_desc:
      "Discover personalized astrological solutions and remedies to balance planetary influences and enhance your life’s harmony.",
    astro_solutions_card_button: "Know More",
    gallery_title: "Gallery",
    gallery_card_title: "View Gallery",
    gallery_card_desc:
      "Explore our collection of sacred moments, rituals, and astrological events captured in photos and videos.",
    gallery_card_button: "View Gallery",
    free_services_title: "Free Services",
    horoscope_title: "Daily Horoscope",
    horoscope_desc:
      "Get your daily astrological predictions and guidance for all zodiac signs.",
    horoscope_button: "View Today",
    matchmaking_title: "Match Making",
    matchmaking_desc:
      "Free compatibility analysis for marriage and relationships based on Vedic astrology.",
    matchmaking_button: "Check Compatibility",
    kundali_title: "Free Kundali",
    kundali_desc:
      "Generate your complete birth chart with detailed planetary positions and analysis.",
    kundali_button: "Generate Kundali",
    contact_title: "Contact Us",
    contact_card_title: "Get in Touch",
    contact_card_desc:
      "Have questions or need assistance? Reach out to our team, and we'll respond promptly.",
    contact_name_label: "Name",
    contact_name_placeholder: "Enter your name",
    contact_email_label: "Email",
    contact_email_placeholder: "Enter your email",
    contact_message_label: "Message",
    contact_message_placeholder: "Your message",
    contact_button: "Send Message",
    footer_logo: "Jyotish Urja",
    footer_desc:
      "Guiding you through the ancient wisdom of Vedic Astrology with personalized insights and spiritual guidance for a meaningful life journey.",
    footer_link_about: "About Us",
    footer_link_services: "Services",
    footer_link_contact: "Contact",
    footer_link_gallery: "Gallery",
    footer_link_privacy: "Privacy Policy",
    footer_link_terms: "Terms of Service",
    footer_copyright:
      "© 2025 Jyotish Urja. All rights reserved. | Designed with cosmic energy ✨",
    chatbot_header_title: "Jyoti",
    chatbot_header_subtitle: "Divine Light",
    chatbot_welcome:
      "Welcome to Jyoti, your Divine Light! 🌟 How can I assist you today?",
    chatbot_response_horoscope:
      "Your daily horoscope is available in the Free Services section! 🌟 Check it for insights based on your zodiac sign.",
    chatbot_response_consultation:
      "Visit the Consultation Services section to book voice, video, or offline consultations! 📞📹🏢",
    chatbot_response_puja:
      "Visit the Puja Services section to book sacred rituals for peace and prosperity. 🕉️",
    chatbot_response_gemstone:
      "Explore our authentic gemstone collection in the Gemstone section! 💎",
    chatbot_response_kundali:
      "Generate your free Kundali in the Free Services section for a detailed birth chart. 📜",
    chatbot_response_astro_solutions:
      "Explore personalized remedies in the Astro Solutions & Remedies section! 🪐",
    chatbot_response_gallery:
      "Explore sacred moments and rituals in the Gallery section! 🖼️",
    chatbot_response_default:
      "Thank you for your message! Our team will assist you soon.",
    chatbot_quick_horoscope: "Daily Horoscope",
    chatbot_quick_consultation: "Book Consultation",
    chatbot_quick_puja: "Puja Booking",
    chatbot_quick_gemstone: "Gemstone Inquiry",
    chatbot_quick_kundali: "Free Kundali",
    chatbot_quick_astro_solutions: "Astro Remedies",
    chatbot_quick_gallery: "View Gallery",
    chatbot_input_placeholder: "Type your message...",
    chatbot_send_button: "Send",
    language_button: "Switch to Hindi",
  },
  hi: {
    logo: "ज्योतिष ऊर्जा",
    nav_home: "होम",
    nav_services: "सेवाएँ",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क करें",
    nav_gallery: "गैलरी",
    dropdown_profile: "प्रोफाइल पूरा करें",
    dropdown_faq: "अक्सर पूछे जाने वाले प्रश्न",
    hero_title: "आपकी आध्यात्मिक यात्रा में स्वागत है",
    hero_quote:
      "तारे प्रेरित करते हैं, वे बाध्य नहीं करते। हम अपने जीवन को जो बनाते हैं, वह हम पर निर्भर है।",
    hero_author: "- प्राचीन वैदिक ज्ञान",
    slideshow_title: "विशेष ऑफर",
    slide_1_title: "विशेष दीवाली ऑफर",
    slide_1_subtitle: "सभी परामर्शों पर 50% छूट",
    slide_2_title: "रत्न संग्रह",
    slide_2_subtitle: "प्रमाणित प्रामाणिक रत्न",
    slide_3_title: "पूजा सेवाएँ",
    slide_3_subtitle: "पवित्र अनुष्ठानों को बुक करें",
    consultation_title: "परामर्श सेवाएँ",
    voice_call_title: "वॉइस कॉल",
    voice_call_desc:
      "वैयक्तिकृत मार्गदर्शन के लिए हमारे विशेषज्ञ ज्योतिषियों से वॉइस परामर्श के माध्यम से जुड़ें।",
    voice_call_button: "और जानें",
    video_call_title: "वीडियो कॉल",
    video_call_desc:
      "विस्तृत चार्ट विश्लेषण और दृश्य मार्गदर्शन के साथ आमने-सामने परामर्श।",
    video_call_button: "और जानें",
    offline_call_title: "ऑफलाइन परामर्श",
    offline_call_desc:
      "व्यापक विश्लेषण के साथ व्यक्तिगत परामर्श के लिए हमारे केंद्र पर जाएँ।",
    offline_call_button: "और जानें",
    gemstone_title: "रत्न संग्रह",
    gemstone_card_title: "अपना रत्न खरीदें",
    gemstone_card_desc:
      "हमारे विशेषज्ञ ज्योतिषियों द्वारा आपकी विशिष्ट आवश्यकताओं और ग्रहों की स्थिति के लिए अनुशंसित प्रामाणिक, प्रमाणित रत्नों की खोज करें।",
    gemstone_card_button: "संग्रह देखें",
    puja_title: "पूजा सेवाएँ",
    puja_card_title: "अपनी पूजा बुक करें",
    puja_card_desc:
      "अनुभवी पुजारियों द्वारा किए गए पवित्र अनुष्ठान और समारोह जो आपके जीवन में शांति, समृद्धि और सकारात्मक ऊर्जा लाते हैं।",
    puja_card_button: "अभी बुक करें",
    astro_solutions_title: "ज्योतिष समाधान और उपाय",
    astro_solutions_card_title: "ज्योतिष उपायों की खोज करें",
    astro_solutions_card_desc:
      "ग्रहों के प्रभावों को संतुलित करने और आपके जीवन की सामंजस्य को बढ़ाने के लिए वैयक्तिकृत ज्योतिषीय समाधान और उपायों की खोज करें।",
    astro_solutions_card_button: "और जानें",
    gallery_title: "गैलरी",
    gallery_card_title: "गैलरी देखें",
    gallery_card_desc:
      "पवित्र क्षणों, अनुष्ठानों और ज्योतिषीय घटनाओं की हमारी संग्रह को फोटो और वीडियो में देखें।",
    gallery_card_button: "गैलरी देखें",
    free_services_title: "मुफ्त सेवाएँ",
    horoscope_title: "दैनिक राशिफल",
    horoscope_desc:
      "सभी राशियों के लिए अपनी दैनिक ज्योतिषीय भविष्यवाणियाँ और मार्गदर्शन प्राप्त करें।",
    horoscope_button: "आज देखें",
    matchmaking_title: "कुंडली मिलान",
    matchmaking_desc:
      "वैदिक ज्योतिष के आधार पर विवाह और रिश्तों के लिए मुफ्त संगतता विश्लेषण।",
    matchmaking_button: "संगतता जांचें",
    kundali_title: "मुफ्त कुंडली",
    kundali_desc:
      "विस्तृत ग्रहों की स्थिति और विश्लेषण के साथ अपनी पूर्ण जन्म कुंडली बनाएँ।",
    kundali_button: "कुंडली बनाएँ",
    contact_title: "संपर्क करें",
    contact_card_title: "संपर्क में रहें",
    contact_card_desc:
      "प्रश्न हैं या सहायता चाहिए? हमारी टीम से संपर्क करें, और हम तुरंत जवाब देंगे।",
    contact_name_label: "नाम",
    contact_name_placeholder: "अपना नाम दर्ज करें",
    contact_email_label: "ईमेल",
    contact_email_placeholder: "अपना ईमेल दर्ज करें",
    contact_message_label: "संदेश",
    contact_message_placeholder: "आपका संदेश",
    contact_button: "संदेश भेजें",
    footer_logo: "ज्योतिष ऊर्जा",
    footer_desc:
      "वैदिक ज्योतिष के प्राचीन ज्ञान के माध्यम से आपको वैयक्तिकृत अंतर्दृष्टि और आध्यात्मिक मार्गदर्शन प्रदान करते हुए, एक सार्थक जीवन यात्रा के लिए।",
    footer_link_about: "हमारे बारे में",
    footer_link_services: "सेवाएँ",
    footer_link_contact: "संपर्क",
    footer_link_gallery: "गैलरी",
    footer_link_privacy: "गोपनीयता नीति",
    footer_link_terms: "सेवा की शर्तें",
    footer_copyright:
      "© 2025 ज्योतिष ऊर्जा। सभी अधिकार सुरक्षित। | ब्रह्मांडीय ऊर्जा के साथ डिज़ाइन किया गया ✨",
    chatbot_header_title: "ज्योति",
    chatbot_header_subtitle: "दिव्य प्रकाश",
    chatbot_welcome:
      "ज्योति, आपके दिव्य प्रकाश में आपका स्वागत है! 🌟 मैं आज आपकी कैसे मदद कर सकता हूँ?",
    chatbot_response_horoscope:
      "आपका दैनिक राशिफल मुफ्त सेवाएँ अनुभाग में उपलब्ध है! 🌟 अपनी राशि के आधार पर अंतर्दृष्टि के लिए इसे देखें।",
    chatbot_response_consultation:
      "वॉइस, वीडियो या ऑफलाइन परामर्श बुक करने के लिए परामर्श सेवाएँ अनुभाग पर जाएँ! 📞📹🏢",
    chatbot_response_puja:
      "शांति और समृद्धि के लिए पवित्र अनुष्ठान बुक करने के लिए पूजा सेवाएँ अनुभाग पर जाएँ। 🕉️",
    chatbot_response_gemstone:
      "रत्न अनुभाग में हमारे प्रामाणिक रत्न संग्रह का अन्वेषण करें! 💎",
    chatbot_response_kundali:
      "विस्तृत जन्म कुंडली के लिए मुफ्त सेवाएँ अनुभाग में अपनी मुफ्त कुंडली बनाएँ। 📜",
    chatbot_response_astro_solutions:
      "ज्योतिष समाधान और उपाय अनुभाग में वैयक्तिकृत उपायों की खोज करें! 🪐",
    chatbot_response_gallery:
      "गैलरी अनुभाग में पवित्र क्षणों और अनुष्ठानों का अन्वेषण करें! 🖼️",
    chatbot_response_default:
      "आपके संदेश के लिए धन्यवाद! हमारी टीम जल्द ही आपकी सहायता करेगी।",
    chatbot_quick_horoscope: "दैनिक राशिफल",
    chatbot_quick_consultation: "परामर्श बुक करें",
    chatbot_quick_puja: "पूजा बुकिंग",
    chatbot_quick_gemstone: "रत्न पूछताछ",
    chatbot_quick_kundali: "मुफ्त कुंडली",
    chatbot_quick_astro_solutions: "ज्योतिष उपाय",
    chatbot_quick_gallery: "गैलरी देखें",
    chatbot_input_placeholder: "अपना संदेश टाइप करें...",
    chatbot_send_button: "भेजें",
    language_button: "Switch to English",
  },
};

const AfterLogin = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [contactLoading, setContactLoading] = useState(false);
  const location = useLocation();

  const slides = [
    {
      id: 1,
      title: translations[language].slide_1_title,
      subtitle: translations[language].slide_1_subtitle,
      image: diwaliBanner,
    },
    {
      id: 2,
      title: translations[language].slide_2_title,
      subtitle: translations[language].slide_2_subtitle,
      image: gemstoneBanner,
    },
    {
      id: 3,
      title: translations[language].slide_3_title,
      subtitle: translations[language].slide_3_subtitle,
      image: pujaBanner,
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear local storage and redirect even if API fails
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      const response = await createConsultancyRequest({
        name: contactName,
        email: contactEmail,
        description: contactMessage,
        consultancyType: "Contact Form",
      });
      if (response.success) {
        alert("Message sent successfully! We will get back to you soon.");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        { sender: "Jyoti", text: translations[language].chatbot_welcome },
      ]);
    }
  };

  const sendMessage = (text) => {
    const userMessage = { sender: "You", text };
    setMessages((prev) => [...prev, userMessage]);

    const responses = {
      [translations[language].chatbot_quick_horoscope]:
        translations[language].chatbot_response_horoscope,
      [translations[language].chatbot_quick_consultation]:
        translations[language].chatbot_response_consultation,
      [translations[language].chatbot_quick_puja]:
        translations[language].chatbot_response_puja,
      [translations[language].chatbot_quick_gemstone]:
        translations[language].chatbot_response_gemstone,
      [translations[language].chatbot_quick_kundali]:
        translations[language].chatbot_response_kundali,
      [translations[language].chatbot_quick_astro_solutions]:
        translations[language].chatbot_response_astro_solutions,
      [translations[language].chatbot_quick_gallery]:
        translations[language].chatbot_response_gallery,
    };

    const botResponseText =
      responses[text] || translations[language].chatbot_response_default;
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "Jyoti", text: botResponseText },
      ]);
    }, 500);

    setUserInput("");
  };

  const quickMessages = [
    translations[language].chatbot_quick_horoscope,
    translations[language].chatbot_quick_consultation,
    translations[language].chatbot_quick_puja,
    translations[language].chatbot_quick_gemstone,
    translations[language].chatbot_quick_kundali,
    translations[language].chatbot_quick_astro_solutions,
    translations[language].chatbot_quick_gallery,
  ];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Source Sans 3', sans-serif;
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
            background: radial-gradient(2px 2px at 20px 30px, #ffd700, transparent),
              radial-gradient(2px 2px at 40px 70px, #fff, transparent),
              radial-gradient(1px 1px at 90px 40px, #ffd700, transparent),
              radial-gradient(1px 1px at 130px 80px, #fff, transparent),
              radial-gradient(2px 2px at 160px 30px, #ffd700, transparent),
              radial-gradient(1px 1px at 200px 60px, #d4af37, transparent),
              radial-gradient(2px 2px at 300px 120px, #fff, transparent);
            background-repeat: repeat;
            background-size: 250px 150px;
            animation: twinkle 25s infinite;
            pointer-events: none;
            z-index: 0;
          }

          @keyframes twinkle {
            0%, 100% {
              opacity: 0.4;
              transform: translateY(0px);
            }
            25% {
              opacity: 0.8;
              transform: translateY(-10px);
            }
            50% {
              opacity: 0.6;
              transform: translateY(0px);
            }
            75% {
              opacity: 0.9;
              transform: translateY(5px);
            }
          }

          .main-container {
            max-width: 1600px;
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
            padding: 30px 60px;
            width: 100%;
            position: relative;
            z-index: 10;
            backdrop-filter: blur(15px);
            background: rgba(26, 35, 50, 0.9);
            border-bottom: 2px solid rgba(212, 175, 55, 0.2);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }

          .logo {
            display: flex;
            align-items: center;
            font-size: 30px;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #d4af37;
          }

          .logo-symbol {
            width: 75px;
            height: 75px;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
            border: 3px solid #d4af37;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            font-size: 20px;
            color: #d4af37;
            position: relative;
            animation: glow 4s ease-in-out infinite alternate;
          }

          @keyframes glow {
            0% {
              box-shadow: 0 0 25px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(212, 175, 55, 0.1);
              transform: scale(1);
            }
            100% {
              box-shadow: 0 0 40px rgba(212, 175, 55, 0.7), inset 0 0 25px rgba(212, 175, 55, 0.2);
              transform: scale(1.05);
            }
          }

          .nav-container {
            display: flex;
            align-items: center;
            gap: 40px;
          }

          .nav {
            display: flex;
            gap: 18px;
            justify-content: center;
          }

          .nav a {
            color: #d4af37;
            text-decoration: none;
            font-size: 18px;
            font-weight: 600;
            padding: 16px 32px;
            border: 2px solid transparent;
            border-radius: 30px;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .nav a::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
            transition: left 0.6s ease;
          }

          .nav a:hover::before {
            left: 100%;
          }

          .nav a:hover {
            border-color: #d4af37;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
            background: rgba(212, 175, 55, 0.1);
          }

          .user-profile {
            position: relative;
          }

          .profile-icon {
            width: 65px;
            height: 65px;
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.4s ease;
            border: 3px solid #d4af37;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          }

          .profile-icon:hover {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
          }

          .profile-icon svg {
            width: 36px;
            height: 36px;
            fill: #1a2332;
          }

          .dropdown {
            position: absolute;
            top: 80px;
            right: 0;
            background: rgba(26, 35, 50, 0.95);
            backdrop-filter: blur(15px);
            border: 2px solid rgba(212, 175, 55, 0.4);
            border-radius: 20px;
            padding: 30px;
            min-width: 250px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-15px) scale(0.9);
            transition: all 0.4s ease;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          }

          .dropdown.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
          }

          .dropdown-item {
            display: block;
            color: #d4af37;
            text-decoration: none;
            padding: 18px 24px;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-weight: 600;
            margin-bottom: 12px;
            border: 1px solid transparent;
            font-size: 18px;
          }

          .dropdown-item:hover {
            background: rgba(212, 175, 55, 0.15);
            transform: translateX(8px);
            border-color: rgba(212, 175, 55, 0.3);
          }

          .logout-btn {
            background: transparent;
            width: 100%;
            text-align: left;
            cursor: pointer;
            margin-bottom: 0;
          }

          .logout-btn:hover {
            background: rgba(231, 76, 60, 0.2);
            border-color: rgba(231, 76, 60, 0.5);
            color: #e74c3c;
          }

          .hero-section {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 120px 60px;
            position: relative;
            z-index: 5;
            min-height: 80vh;
            width: 100%;
          }

          .hero-content {
            max-width: 58%;
            padding-right: 50px;
            text-align: center;
          }

          .hero-content h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(48px, 7vw, 72px);
            font-weight: 800;
            color: #d4af37;
            margin-bottom: 40px;
            line-height: 1.1;
            text-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            letter-spacing: 1px;
          }

          .hero-content .quote {
            font-family: 'Crimson Text', serif;
            font-size: clamp(24px, 3.5vw, 36px);
            font-style: italic;
            color: #d4af37;
            margin-bottom: 30px;
            line-height: 1.5;
            position: relative;
            padding-left: 35px;
          }

          .hero-content .quote::before {
            content: '"';
            position: absolute;
            left: 0;
            top: -12px;
            font-size: 70px;
            color: rgba(212, 175, 55, 0.3);
            font-family: 'Playfair Display', serif;
          }

          .hero-content .author {
            font-size: 22px;
            color: rgba(212, 175, 55, 0.8);
            font-weight: 600;
            font-style: italic;
          }

          .hero-image {
            max-width: 38%;
            border-radius: 30px;
            box-shadow: 0 30px 90px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
          }

          .hero-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent);
            z-index: 1;
            border-radius: 30px;
          }

          .hero-image img {
            width: 100%;
            height: auto;
            border-radius: 30px;
            transition: transform 0.4s ease;
          }

          .hero-image:hover img {
            transform: scale(1.05);
          }

          .slideshow-section {
            padding: 120px 60px;
            position: relative;
            z-index: 5;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .section-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(48px, 7vw, 64px);
            font-weight: 800;
            text-align: center;
            color: #d4af37;
            margin-bottom: 70px;
            text-transform: uppercase;
            letter-spacing: 3px;
            position: relative;
          }

          .section-title::after {
            content: '';
            position: absolute;
            bottom: -18px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 5px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
            border-radius: 2px;
          }

          .slideshow-container {
            position: relative;
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 35px 90px rgba(212, 175, 55, 0.25);
          }

          .slide {
            display: none;
            position: relative;
            text-align: center;
          }

          .slide.active {
            display: block;
          }

          .slide img {
            width: 100%;
            height: 450px;
            object-fit: cover;
          }

          .slide-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          }

          .slide-content h3 {
            font-family: 'Playfair Display', serif;
            font-size: 54px;
            font-weight: 700;
            margin-bottom: 18px;
          }

          .slide-content p {
            font-size: 28px;
            font-weight: 500;
          }

          .slide-indicators {
            text-align: center;
            margin-top: 25px;
          }

          .indicator {
            display: inline-block;
            width: 14px;
            height: 14px;
            background: rgba(212, 175, 55, 0.5);
            border-radius: 50%;
            margin: 0 6px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .indicator.active {
            background: #d4af37;
            transform: scale(1.2);
          }

          .section {
            padding: 120px 60px;
            position: relative;
            z-index: 5;
            background: rgba(26, 35, 50, 0.7);
            backdrop-filter: blur(15px);
            margin-top: 35px;
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

          .cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 50px;
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            justify-items: center;
          }

          .card {
            background: rgba(26, 35, 50, 0.9);
            backdrop-filter: blur(15px);
            padding: 60px 40px;
            border-radius: 30px;
            text-align: center;
            transition: all 0.4s ease;
            border: 2px solid rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 450px;
          }

          .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.08));
            transition: left 0.6s ease;
            z-index: -1;
          }

          .card:hover::before {
            left: 0;
          }

          .card:hover {
            transform: translateY(-15px);
            box-shadow: 0 30px 90px rgba(212, 175, 55, 0.3);
            border-color: rgba(212, 175, 55, 0.6);
          }

          .card-icon {
            font-size: 80px;
            margin-bottom: 30px;
            color: #d4af37;
            transition: all 0.4s ease;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }

          .card:hover .card-icon {
            transform: scale(1.2) rotate(5deg);
            text-shadow: 0 6px 12px rgba(212, 175, 55, 0.4);
          }

          .card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 30px;
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }

          .card p {
            font-size: 18px;
            color: rgba(212, 175, 55, 0.85);
            margin-bottom: 35px;
            line-height: 1.7;
          }

          .card-button {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            color: #1a2332;
            border: none;
            padding: 18px 40px;
            font-size: 18px;
            font-weight: 700;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.4s ease;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-family: 'Source Sans 3', sans-serif;
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
            display: inline-block;
            text-decoration: none;
          }

          .card-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.6s ease;
          }

          .card-button:hover::before {
            left: 100%;
          }

          .card-button:hover {
            background: linear-gradient(135deg, #e9c46a, #d4af37);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 12px 35px rgba(212, 175, 55, 0.5);
          }

          .single-card-container {
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .single-card-container .card {
            max-width: 100%;
          }

          .contact-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 25px;
            width: 100%;
            max-width: 600px;
          }

          .contact-form label {
            font-size: 20px;
            color: #d4af37;
            font-weight: 600;
            text-align: left;
            width: 100%;
          }

          .contact-form input,
          .contact-form textarea {
            width: 100%;
            padding: 14px 24px;
            font-size: 18px;
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            background: rgba(26, 35, 50, 0.8);
            color: #faf0e6;
            transition: all 0.3s ease;
          }

          .contact-form textarea {
            height: 180px;
            resize: vertical;
          }

          .contact-form input:focus,
          .contact-form textarea:focus {
            border-color: #d4af37;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
          }

          .footer {
            background: rgba(13, 27, 42, 0.95);
            backdrop-filter: blur(15px);
            padding: 100px 60px 50px;
            text-align: center;
            border-top: 2px solid rgba(212, 175, 55, 0.3);
            position: relative;
            z-index: 5;
            margin-top: 70px;
            width: 100%;
          }

          .footer-content {
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .footer-logo {
            font-family: 'Playfair Display', serif;
            font-size: 44px;
            font-weight: 800;
            color: #d4af37;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 3px;
          }

          .footer-description {
            font-size: 22px;
            color: rgba(212, 175, 55, 0.85);
            margin-bottom: 60px;
            max-width: 800px;
            line-height: 1.7;
            text-align: center;
          }

          .footer-links {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-bottom: 60px;
            flex-wrap: wrap;
          }

          .footer-links a {
            color: #d4af37;
            text-decoration: none;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            padding: 10px 20px;
            border-radius: 20px;
          }

          .footer-links a:hover {
            color: #e9c46a;
            transform: translateY(-2px);
            background: rgba(212, 175, 55, 0.1);
          }

          .footer-bottom {
            border-top: 1px solid rgba(212, 175, 55, 0.3);
            padding-top: 40px;
            color: rgba(212, 175, 55, 0.7);
            font-size: 16px;
            width: 100%;
            text-align: center;
          }

          .chatbot-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.5);
            transition: all 0.3s ease;
          }

          .chatbot-button:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.7);
          }

          .chatbot-button svg {
            width: 36px;
            height: 36px;
            fill: #1a2332;
          }

          .whatsapp-button {
            position: fixed;
            bottom: 110px;
            right: 30px;
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #25D366, #128C7E);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.5);
            transition: all 0.3s ease;
          }

          .whatsapp-button:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.7);
          }

          .whatsapp-button svg {
            width: 36px;
            height: 36px;
            fill: #ffffff;
          }

          .chatbot-container {
            position: fixed;
            bottom: 120px;
            right: 30px;
            width: 400px;
            max-height: 600px;
            background: rgba(26, 35, 50, 0.95);
            backdrop-filter: blur(15px);
            border: 2px solid rgba(212, 175, 55, 0.4);
            border-radius: 20px;
            overflow: hidden;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            display: ${isChatOpen ? "flex" : "none"};
            flex-direction: column;
          }

          .chatbot-header {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            padding: 18px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
          }

          .chatbot-header svg {
            width: 28px;
            height: 28px;
            fill: #1a2332;
          }

          .chatbot-header h3 {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            color: #1a2332;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .chatbot-header p {
            font-size: 14px;
            color: #1a2332;
            font-style: italic;
          }

          .chatbot-messages {
            flex: 1;
            padding: 24px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .message {
            max-width: 80%;
            padding: 12px 18px;
            border-radius: 15px;
            font-size: 16px;
            line-height: 1.5;
          }

          .message.user {
            background: #d4af37;
            color: #1a2332;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
          }

          .message.bot {
            background: rgba(212, 175, 55, 0.2);
            color: #faf0e6;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
          }

          .chatbot-quick-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            padding: 12px 24px;
            border-top: 1px solid rgba(212, 175, 55, 0.3);
          }

          .quick-button {
            background: rgba(212, 175, 55, 0.2);
            color: #d4af37;
            border: 1px solid rgba(212, 175, 55, 0.4);
            padding: 10px 18px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            flex: 1;
            min-width: 110px;
          }

          .quick-button:hover {
            background: #d4af37;
            color: #1a2332;
            transform: translateY(-2px);
          }

          .chatbot-input-container {
            display: flex;
            padding: 18px 24px;
            border-top: 1px solid rgba(212, 175, 55, 0.3);
          }

          .chatbot-input {
            flex: 1;
            padding: 12px 18px;
            font-size: 16px;
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            background: rgba(26, 35, 50, 0.8);
            color: #faf0e6;
            outline: none;
            transition: all 0.3s ease;
          }

          .chatbot-input:focus {
            border-color: #d4af37;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
          }

          .chatbot-send-button {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            color: #1a2332;
            border: none;
            padding: 12px 18px;
            margin-left: 12px;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 16px;
          }

          .chatbot-send-button:hover {
            background: linear-gradient(135deg, #e9c46a, #d4af37);
            transform: translateY(-2px);
          }

          .language-button {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            color: #1a2332;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          }

          .language-button:hover {
            background: linear-gradient(135deg, #e9c46a, #d4af37);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.5);
          }

          @media (max-width: 768px) {
            .main-container {
              max-width: 100%;
            }

            .header {
              padding: 25px 30px;
              flex-direction: column;
              gap: 25px;
            }

            .logo {
              font-size: 26px;
            }

            .logo-symbol {
              width: 65px;
              height: 65px;
              margin-right: 15px;
              font-size: 18px;
            }

            .nav-container {
              flex-direction: column;
              gap: 25px;
            }

            .nav {
              flex-wrap: wrap;
              justify-content: center;
              gap: 10px;
            }

            .nav a {
              font-size: 16px;
              padding: 12px 24px;
            }

            .profile-icon {
              width: 55px;
              height: 55px;
            }

            .profile-icon svg {
              width: 30px;
              height: 30px;
            }

            .dropdown {
              top: 70px;
              min-width: 220px;
              padding: 25px;
            }

            .dropdown-item {
              font-size: 16px;
              padding: 14px 20px;
            }

            .hero-section {
              flex-direction: column;
              padding: 80px 30px;
              text-align: center;
              gap: 40px;
              align-items: center;
            }

            .hero-content {
              max-width: 100%;
              padding-right: 0;
            }

            .hero-content h1 {
              font-size: clamp(40px, 6vw, 56px);
            }

            .hero-content .quote {
              font-size: clamp(20px, 3vw, 28px);
              padding-left: 25px;
            }

            .hero-content .quote::before {
              font-size: 50px;
              top: -8px;
            }

            .hero-content .author {
              font-size: 18px;
            }

            .hero-image {
              max-width: 85%;
              border-radius: 20px;
            }

            .slideshow-section,
            .section {
              padding: 80px 30px;
            }

            .section-title {
              font-size: clamp(40px, 6vw, 48px);
              margin-bottom: 50px;
            }

            .section-title::after {
              width: 100px;
              height: 4px;
            }

            .slideshow-container {
              max-width: 100%;
              border-radius: 20px;
            }

            .slide img {
              height: 350px;
            }

            .slide-content h3 {
              font-size: 40px;
              margin-bottom: 12px;
            }

            .slide-content p {
              font-size: 22px;
            }

            .indicator {
              width: 12px;
              height: 12px;
              margin: 0 5px;
            }

            .cards-container {
              grid-template-columns: 1fr;
              gap: 30px;
              justify-items: center;
            }

            .card {
              max-width: 100%;
              padding: 40px 25px;
            }

            .card-icon {
              font-size: 70px;
              margin-bottom: 25px;
            }

            .card h3 {
              font-size: 26px;
              margin-bottom: 15px;
            }

            .card p {
              font-size: 16px;
              margin-bottom: 25px;
            }

            .card-button {
              padding: 14px 30px;
              font-size: 16px;
            }

            .single-card-container {
              max-width: 100%;
            }

            .contact-form {
              max-width: 100%;
            }

            .contact-form label {
              font-size: 18px;
            }

            .contact-form input,
            .contact-form textarea {
              padding: 12px 20px;
              font-size: 16px;
            }

            .contact-form textarea {
              height: 150px;
            }

            .footer {
              padding: 80px 30px 40px;
              margin-top: 50px;
            }

            .footer-logo {
              font-size: 36px;
              margin-bottom: 25px;
            }

            .footer-description {
              font-size: 20px;
              margin-bottom: 50px;
              max-width: 100%;
            }

            .footer-links {
              flex-direction: column;
              gap: 30px;
              margin-bottom: 50px;
            }

            .footer-links a {
              font-size: 16px;
              padding: 8px 16px;
            }

            .footer-bottom {
              font-size: 14px;
              padding-top: 30px;
            }

            .chatbot-container {
              width: 90%;
              max-height: 70vh;
              bottom: 90px;
              right: 5%;
            }

            .chatbot-button {
              bottom: 20px;
              right: 20px;
              width: 60px;
              height: 60px;
            }

            .chatbot-button svg {
              width: 32px;
              height: 32px;
            }

            .whatsapp-button {
              bottom: 90px;
              right: 20px;
              width: 60px;
              height: 60px;
            }

            .whatsapp-button svg {
              width: 32px;
              height: 32px;
            }

            .chatbot-header {
              padding: 15px 20px;
            }

            .chatbot-header svg {
              width: 24px;
              height: 24px;
            }

            .chatbot-header h3 {
              font-size: 20px;
            }

            .chatbot-header p {
              font-size: 12px;
            }

            .chatbot-messages {
              padding: 20px;
              gap: 15px;
            }

            .message {
              font-size: 14px;
              padding: 10px 15px;
            }

            .chatbot-quick-buttons {
              padding: 10px 20px;
              gap: 10px;
            }

            .quick-button {
              padding: 8px 15px;
              font-size: 13px;
              min-width: 100px;
            }

            .chatbot-input-container {
              padding: 15px 20px;
            }

            .chatbot-input {
              padding: 10px 15px;
              font-size: 14px;
            }

            .chatbot-send-button {
              padding: 10px 15px;
              font-size: 14px;
              margin-left: 10px;
            }

            .language-button {
              padding: 10px 20px;
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .header {
              padding: 20px 20px;
              gap: 20px;
            }

            .logo {
              font-size: 24px;
            }

            .logo-symbol {
              width: 55px;
              height: 55px;
              margin-right: 12px;
              font-size: 16px;
            }

            .nav a {
              font-size: 14px;
              padding: 10px 20px;
            }

            .profile-icon {
              width: 50px;
              height: 50px;
            }

            .profile-icon svg {
              width: 28px;
              height: 28px;
            }

            .dropdown {
              top: 60px;
              min-width: 200px;
              padding: 20px;
            }

            .dropdown-item {
              font-size: 14px;
              padding: 12px 18px;
            }

            .hero-section {
              padding: 60px 20px;
              gap: 30px;
            }

            .hero-content h1 {
              font-size: clamp(32px, 5vw, 48px);
            }

            .hero-content .quote {
              font-size: clamp(18px, 2.5vw, 24px);
              padding-left: 20px;
            }

            .hero-content .quote::before {
              font-size: 40px;
              top: -6px;
            }

            .hero-content .author {
              font-size: 16px;
            }

            .hero-image {
              max-width: 90%;
              border-radius: 15px;
            }

            .slideshow-section,
            .section {
              padding: 60px 20px;
            }

            .section-title {
              font-size: clamp(32px, 5vw, 40px);
              margin-bottom: 40px;
            }

            .section-title::after {
              width: 80px;
              height: 3px;
            }

            .slideshow-container {
              border-radius: 15px;
            }

            .slide img {
              height: 300px;
            }

            .slide-content h3 {
              font-size: 32px;
              margin-bottom: 10px;
            }

            .slide-content p {
              font-size: 18px;
            }

            .indicator {
              width: 10px;
              height: 10px;
              margin: 0 4px;
            }

            .card {
              padding: 30px 20px;
            }

            .card-icon {
              font-size: 60px;
              margin-bottom: 20px;
            }

            .card h3 {
              font-size: 22px;
              margin-bottom: 12px;
            }

            .card p {
              font-size: 14px;
              margin-bottom: 20px;
            }

            .card-button {
              padding: 12px 25px;
              font-size: 14px;
            }

            .contact-form label {
              font-size: 16px;
            }

            .contact-form input,
            .contact-form textarea {
              padding: 10px 15px;
              font-size: 14px;
            }

            .contact-form textarea {
              height: 120px;
            }

            .footer {
              padding: 60px 20px 30px;
              margin-top: 40px;
            }

            .footer-logo {
              font-size: 32px;
              margin-bottom: 20px;
            }

            .footer-description {
              font-size: 18px;
              margin-bottom: 40px;
            }

            .footer-links {
              gap: 20px;
              margin-bottom: 40px;
            }

            .footer-links a {
              font-size: 14px;
              padding: 6px 12px;
            }

            .footer-bottom {
              font-size: 13px;
              padding-top: 25px;
            }

            .chatbot-container {
              width: 85%;
              max-height: 60vh;
              bottom: 80px;
            }

            .chatbot-button {
              width: 50px;
              height: 50px;
            }

            .chatbot-button svg {
              width: 28px;
              height: 28px;
            }

            .whatsapp-button {
              width: 50px;
              height: 50px;
              bottom: 80px;
            }

            .whatsapp-button svg {
              width: 28px;
              height: 28px;
            }

            .chatbot-header {
              padding: 12px 15px;
            }

            .chatbot-header svg {
              width: 20px;
              height: 20px;
            }

            .chatbot-header h3 {
              font-size: 18px;
            }

            .chatbot-header p {
              font-size: 11px;
            }

            .chatbot-messages {
              padding: 15px;
              gap: 12px;
            }

            .message {
              font-size: 13px;
              padding: 8px 12px;
            }

            .chatbot-quick-buttons {
              padding: 8px 15px;
              gap: 8px;
            }

            .quick-button {
              padding: 6px 12px;
              font-size: 12px;
              min-width: 90px;
            }

            .chatbot-input-container {
              padding: 12px 15px;
            }

            .chatbot-input {
              padding: 8px 12px;
              font-size: 13px;
            }

            .chatbot-send-button {
              padding: 8px 12px;
              font-size: 13px;
              margin-left: 8px;
            }

            .language-button {
              padding: 8px 15px;
              font-size: 13px;
            }
          }

          /* Accessibility Enhancements */
          .nav a:focus,
          .dropdown-item:focus,
          .card-button:focus,
          .chatbot-button:focus,
          .whatsapp-button:focus,
          .chatbot-input:focus,
          .chatbot-send-button:focus,
          .quick-button:focus,
          .language-button:focus,
          .contact-form input:focus,
          .contact-form textarea:focus {
            outline: 2px solid #e9c46a;
            outline-offset: 2px;
          }
        `}
      </style>

      <div className="main-container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-symbol">ॐ</div>
            {translations[language].logo}
          </div>
          <div className="nav-container">
            <nav className="nav">
              <Link to="/dashboard#home">
                {translations[language].nav_home}
              </Link>
              <Link to="/dashboard#services">
                {translations[language].nav_services}
              </Link>
              <Link to="/dashboard#gallery">
                {translations[language].nav_gallery}
              </Link>
              <Link to="/dashboard#contact">
                {translations[language].nav_contact}
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
                  {translations[language].dropdown_profile}
                </Link>
                <Link to="/faq" className="dropdown-item">
                  {translations[language].dropdown_faq}
                </Link>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <button className="language-button" onClick={toggleLanguage}>
              {translations[language].language_button}
            </button>
          </div>
        </header>

        <section className="hero-section" id="home">
          <div className="hero-content">
            <h1>{translations[language].hero_title}</h1>
            <div className="quote">{translations[language].hero_quote}</div>
            <div className="author">{translations[language].hero_author}</div>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Spiritual Guru" />
          </div>
        </section>

        {/* Slideshow Section */}
        <section className="slideshow-section">
          <h2 className="section-title">
            {translations[language].slideshow_title}
          </h2>
          <div className="slideshow-container">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slide ${index === currentSlide ? "active" : ""}`}
              >
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                />
                <div className="slide-content">
                  <h3>{slide.title}</h3>
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentSlide ? "active" : ""
                  }`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </section>

        {/* Consultation Section */}
        <section className="section" id="services">
          <h2 className="section-title">
            {translations[language].consultation_title}
          </h2>
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">📞</div>
              <h3>{translations[language].voice_call_title}</h3>
              <p>{translations[language].voice_call_desc}</p>
              <Link to="/voicecall" className="card-button">
                {translations[language].voice_call_button}
              </Link>
            </div>
            <div className="card">
              <div className="card-icon">📹</div>
              <h3>{translations[language].video_call_title}</h3>
              <p>{translations[language].video_call_desc}</p>
              <Link to="/videocall" className="card-button">
                {translations[language].video_call_button}
              </Link>
            </div>
            <div className="card">
              <div className="card-icon">🏢</div>
              <h3>{translations[language].offline_call_title}</h3>
              <p>{translations[language].offline_call_desc}</p>
              <Link to="/offlinecall" className="card-button">
                {translations[language].offline_call_button}
              </Link>
            </div>
          </div>
        </section>

        {/* Gemstone Section */}
        <section className="section">
          <h2 className="section-title">
            {translations[language].gemstone_title}
          </h2>
          <div className="single-card-container">
            <div className="card">
              <div className="card-icon">💎</div>
              <h3>{translations[language].gemstone_card_title}</h3>
              <p>{translations[language].gemstone_card_desc}</p>
              <Link to="/gemstone" className="card-button">
                {translations[language].gemstone_card_button}
              </Link>
            </div>
          </div>
        </section>

        {/* Puja Bookings Section */}
        <section className="section">
          <h2 className="section-title">{translations[language].puja_title}</h2>
          <div className="single-card-container">
            <div className="card">
              <div className="card-icon">🕉️</div>
              <h3>{translations[language].puja_card_title}</h3>
              <p>{translations[language].puja_card_desc}</p>
              <Link to="/puja" className="card-button">
                {translations[language].puja_card_button}
              </Link>
            </div>
          </div>
        </section>

        {/* Astro Solutions & Remedies Section */}
        <section className="section">
          <h2 className="section-title">
            {translations[language].astro_solutions_title}
          </h2>
          <div className="single-card-container">
            <div className="card">
              <div className="card-icon">🪐</div>
              <h3>{translations[language].astro_solutions_card_title}</h3>
              <p>{translations[language].astro_solutions_card_desc}</p>
              <Link to="/astro-remedies" className="card-button">
                {translations[language].astro_solutions_card_button}
              </Link>
            </div>
          </div>
        </section>

        {/* Free Services Section */}
        <section className="section" id="free-services">
          <h2 className="section-title">
            {translations[language].free_services_title}
          </h2>
          <div className="cards-container">
            <div className="card">
              <div className="card-icon">🌟</div>
              <h3>{translations[language].horoscope_title}</h3>
              <p>{translations[language].horoscope_desc}</p>
              <Link to="/horoscope" className="card-button">
                {translations[language].horoscope_button}
              </Link>
            </div>
            <div className="card">
              <div className="card-icon">💞</div>
              <h3>{translations[language].matchmaking_title}</h3>
              <p>{translations[language].matchmaking_desc}</p>
              <Link to="/matchmaking" className="card-button">
                {translations[language].matchmaking_button}
              </Link>
            </div>
            <div className="card">
              <div className="card-icon">📜</div>
              <h3>{translations[language].kundali_title}</h3>
              <p>{translations[language].kundali_desc}</p>
              <Link to="/kundali" className="card-button">
                {translations[language].kundali_button}
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section" id="gallery">
          <h2 className="section-title">
            {translations[language].gallery_title}
          </h2>
          <div className="single-card-container">
            <div className="card">
              <div className="card-icon">🖼️</div>
              <h3>{translations[language].gallery_card_title}</h3>
              <p>{translations[language].gallery_card_desc}</p>
              <Link to="/gallery" className="card-button">
                {translations[language].gallery_card_button}
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="contact">
          <h2 className="section-title">
            {translations[language].contact_title}
          </h2>
          <div className="single-card-container">
            <div className="card">
              <div className="card-icon">📧</div>
              <h3>{translations[language].contact_card_title}</h3>
              <p>{translations[language].contact_card_desc}</p>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <label htmlFor="contact-name">
                  {translations[language].contact_name_label}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder={translations[language].contact_name_placeholder}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
                <label htmlFor="contact-email">
                  {translations[language].contact_email_label}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={translations[language].contact_email_placeholder}
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
                <label htmlFor="contact-message">
                  {translations[language].contact_message_label}
                </label>
                <textarea
                  id="contact-message"
                  placeholder={
                    translations[language].contact_message_placeholder
                  }
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                ></textarea>
                <button type="submit" className="card-button">
                  {translations[language].contact_button}
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              {translations[language].footer_logo}
            </div>
            <p className="footer-description">
              {translations[language].footer_desc}
            </p>
            <div className="footer-links">
              <Link to="/dashboard#about">
                {translations[language].footer_link_about}
              </Link>
              <Link to="/dashboard#services">
                {translations[language].footer_link_services}
              </Link>
              <Link to="/dashboard#gallery">
                {translations[language].footer_link_gallery}
              </Link>
              <Link to="/dashboard#contact">
                {translations[language].footer_link_contact}
              </Link>
              <Link to="/privacy">
                {translations[language].footer_link_privacy}
              </Link>
              <Link to="/terms">
                {translations[language].footer_link_terms}
              </Link>
            </div>
            <div className="footer-bottom">
              {translations[language].footer_copyright}
            </div>
          </div>
        </footer>

        {/* Chatbot Button */}
        <div className="chatbot-button" onClick={toggleChat}>
          <svg viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          <svg viewBox="0 0 24 24">
            <path d="M16.75 13.96c-.25.13-.41.2-.46.3-.06.11-.04.61.21 1.18.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-.9-3.85-3.24-3.95-3.46-.1-.23-1.08-1.5-1.08-2.86s.69-.83 1-.99c.25-.1.56-.24.76-.34.24-.13.32-.14.45-.07.18.11.24.37.37.64.1.2.18.44.28.68.08.2.01.43-.05.63-.07.22-.15.45-.2.56-.13.3-.29.38-.44.46-.1.05-.21.1-.38.16-.26.1-1.02.5-1.17.95-.15.5.05.84.24 1.1.19.27.78.93 1.64 1.47.97.6 1.74.74 2.04.8.29.07.58-.02.85-.15.39-.18 1.28-.5 1.6-.63.3-.13.5-.05.63.05.15.1.22.26.28.46.06.23.03.57-.02.83-.07.42-.43.76-.9.97zm3.03-2.22c-.49 2.44-2.76 4.34-5.4 4.34-1.61 0-3.1-.67-4.22-1.78L2 21.41l1.39-4.87C2.51 15.37 2 13.74 2 12c0-5.51 4.49-10 10-10s10 4.49 10 10c0 1.1-.18 2.16-.51 3.15z" />
          </svg>
        </a>

        {/* Chatbot Container */}
        <div className="chatbot-container">
          <div className="chatbot-header">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <div>
              <h3>{translations[language].chatbot_header_title}</h3>
              <p>{translations[language].chatbot_header_subtitle}</p>
            </div>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "You" ? "user" : "bot"}`}
              >
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
              placeholder={translations[language].chatbot_input_placeholder}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
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
              {translations[language].chatbot_send_button}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AfterLogin;