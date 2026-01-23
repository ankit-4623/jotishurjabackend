"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRazorpayKey, createPaymentOrder, verifyPayment, createConsultancyRequest } from "./api/api";

const OfflineConsultation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    timeOfBirth: "",
    placeOfBirth: "",
    areaOfConcern: "",
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        { sender: "Jyoti", text: "Welcome to Jyoti, your Divine Light! 🌟 How can I assist you with your offline consultation?" },
      ]);
    }
  }, [isChatOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(formData).every((field) => field.trim())) {
      alert("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      // Get Razorpay key from backend
      const keyResponse = await getRazorpayKey();
      if (!keyResponse.success) {
        throw new Error("Failed to get payment key");
      }

      // Create order on backend
      const orderResponse = await createPaymentOrder(1000); // ₹1000
      if (!orderResponse.success) {
        throw new Error("Failed to create payment order");
      }

      const options = {
        key: keyResponse.key,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: "Jyotish Urja",
        description: "Offline Consultation",
        order_id: orderResponse.order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.success) {
              // Create consultancy request after payment
              await createConsultancyRequest({
                consultancyType: "Offline Consultation",
                name: formData.name,
                dob: formData.dob,
                birthTime: formData.timeOfBirth,
                birthPlace: formData.placeOfBirth,
                description: formData.areaOfConcern,
                price: 1000,
              });

              alert("Payment has been done, you will get dates from us for date and time");
              setFormData({
                name: "",
                dob: "",
                timeOfBirth: "",
                placeOfBirth: "",
                areaOfConcern: "",
              });
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
        },
        theme: {
          color: "#d4af37",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to process payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = (text) => {
    const userMessage = { sender: "You", text };
    setMessages((prev) => [...prev, userMessage]);
    const responses = {
      "Consultation Cost": "The offline consultation costs ₹1000 for a 30-minute in-person session.",
      "Session Duration": "Each offline consultation lasts 30 minutes, providing ample time for personalized guidance.",
      "Astrologer Expertise": "Our astrologers are seasoned experts in Vedic astrology, blending ancient wisdom with modern insights.",
      "Payment Process": "Payments are securely processed via Razorpay. Fill out the form and proceed to payment to book your session.",
      "Schedule Appointment": "After payment, our team will contact you to schedule your in-person consultation at a convenient time and location.",
    };
    const botResponseText = responses[text] || "Thank you for your message! Our team will assist you soon.";
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "Jyoti", text: botResponseText }]);
    }, 500);
    setUserInput("");
  };

  const quickMessages = [
    "Consultation Cost",
    "Session Duration",
    "Astrologer Expertise",
    "Payment Process",
    "Schedule Appointment",
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Source+Sans+3:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600&display=swap');

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
            background: radial-gradient(2px 2px at 25px 15px, #ffd700, transparent),
              radial-gradient(2px 2px at 60px 85px, #fff, transparent),
              radial-gradient(1px 1px at 75px 45px, #ffd700, transparent),
              radial-gradient(1px 1px at 110px 95px, #fff, transparent),
              radial-gradient(2px 2px at 140px 35px, #ffd700, transparent),
              radial-gradient(1px 1px at 170px 65px, #d4af37, transparent),
              radial-gradient(2px 2px at 270px 105px, #fff, transparent);
            background-repeat: repeat;
            background-size: 270px 170px;
            animation: twinkle 25s infinite;
            pointer-events: none;
            z-index: 0;
            opacity: 0.5;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: translateY(0px); }
            50% { opacity: 0.6; transform: translateY(-5px); }
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
            font-family: 'Cinzel', serif;
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
            font-size: 16px;
            color: #d4af37;
            position: relative;
            animation: glow 3s ease-in-out infinite alternate;
          }

          @keyframes glow {
            0% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.2); }
            100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
          }

          .nav-container {
            display: flex;
            align-items: center;
            position: relative;
          }

          .nav {
            display: flex;
            gap: 10px;
          }

          .nav a {
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
          }

          .nav a::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
            transition: left 0.5s;
          }

          .nav a:hover::before {
            left: 100%;
          }

          .nav a:hover {
            border-color: #d4af37;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.2);
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
            width: 40px;
            height: 40px;
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
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
          }

          .profile-icon svg {
            width: 24px;
            height: 24px;
            fill: #1a2332;
          }

          .dropdown {
            position: absolute;
            top: 50px;
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
            font-family: 'Cinzel', serif;
            font-size: clamp(36px, 6vw, 48px);
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 20px;
            line-height: 1.3;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            letter-spacing: 1.5px;
          }

          .hero-content p {
            font-family: 'Crimson Text', serif;
            font-size: clamp(18px, 3vw, 24px);
            color: rgba(212, 175, 55, 0.9);
            margin-bottom: 30px;
            line-height: 1.6;
          }

          .spiritual-svg {
            width: 150px;
            height: 150px;
            margin: 0 auto 20px;
            animation: glow 3s ease-in-out infinite alternate;
          }

          .spiritual-svg .yantra-path {
            fill: rgba(212, 175, 55, 0.2);
            stroke: #d4af37;
            stroke-width: 2;
            transition: all 0.3s ease;
          }

          .spiritual-svg .om-center {
            fill: #d4af37;
            stroke: #e9c46a;
            stroke-width: 1;
          }

          .spiritual-svg:hover .yantra-path {
            fill: rgba(212, 175, 55, 0.3);
            stroke: #e9c46a;
          }

          .section {
            padding: 80px 40px;
            position: relative;
            z-index: 5;
            background: rgba(26, 35, 50, 0.8);
            backdrop-filter: blur(8px);
            margin-top: 20px;
            border-radius: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .section-title {
            font-family: 'Cinzel', serif;
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

          .form-container {
            max-width: 500px;
            width: 100%;
            margin: 0 auto;
          }

          .card {
            background: rgba(26, 35, 50, 0.9);
            backdrop-filter: blur(8px);
            padding: 40px 30px;
            border-radius: 20px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(212, 175, 55, 0.2);
            position: relative;
            overflow: hidden;
            width: 100%;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
          }

          .card::before {
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

          .card:hover::before {
            left: 0;
          }

          .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
            border-color: rgba(212, 175, 55, 0.4);
          }

          .card-icon {
            font-size: 50px;
            margin-bottom: 20px;
            color: #d4af37;
            transition: all 0.3s ease;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          .card:hover .card-icon {
            transform: scale(1.1);
            text-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
          }

          .card h3 {
            font-family: 'Cinzel', serif;
            font-size: 22px;
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .card p {
            font-size: 15px;
            color: rgba(212, 175, 55, 0.9);
            margin-bottom: 25px;
            line-height: 1.6;
          }

          .form-field {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 15px;
            width: 100%;
          }

          .form-field label {
            font-size: 16px;
            color: #d4af37;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .form-field input,
          .form-field select {
            width: 100%;
            padding: 10px 15px;
            font-size: 14px;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 10px;
            background: rgba(26, 35, 50, 0.8);
            color: #faf0e6;
            transition: all 0.3s ease;
            min-height: 44px;
          }

          .form-field input:focus,
          .form-field select:focus {
            border-color: #d4af37;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
            outline: none;
          }

          .card-button {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            color: #1a2332;
            border: none;
            padding: 12px 25px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Source Sans 3', sans-serif;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 250px;
            min-height: 44px;
          }

          .card-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
          }

          .card-button:hover::before {
            left: 100%;
          }

          .card-button:hover {
            background: linear-gradient(135deg, #e9c46a, #d4af37);
            transform: translateY(-2px);
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
            font-family: 'Cinzel', serif;
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
          }

          .usp-icon {
            font-size: 40px;
            margin-bottom: 15px;
            color: #d4af37;
            transition: all 0.3s ease;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          .usp-card:hover .usp-icon {
            transform: scale(1.1);
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
            font-family: 'Cinzel', serif;
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
            display: flex;
            align-items: center;
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
            display: ${isChatOpen ? 'flex' : 'none'};
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
            font-family: 'Cinzel', serif;
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
            max-width: 80%;
            padding: 8px 12px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.5;
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
              font-size: 14px;
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
              text-align: center;
              min-height: 40px;
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
              font-size: clamp(16px, 2.5vw, 20px);
              margin-bottom: 20px;
            }

            .spiritual-svg {
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

            .form-container {
              max-width: 90%;
            }

            .card {
              padding: 30px 20px;
              border-radius: 15px;
            }

            .card-icon {
              font-size: 40px;
              margin-bottom: 15px;
            }

            .card h3 {
              font-size: 20px;
              margin-bottom: 12px;
            }

            .card p {
              font-size: 14px;
              margin-bottom: 20px;
            }

            .form-field label {
              font-size: 14px;
              margin-bottom: 6px;
            }

            .form-field input,
            .form-field select {
              padding: 8px 12px;
              font-size: 13px;
              border-radius: 8px;
              min-height: 40px;
            }

            .card-button {
              padding: 10px 20px;
              font-size: 13px;
              max-width: 200px;
              min-height: 40px;
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
              font-size: 32px;
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
              font-size: 12px;
              margin-right: 8px;
            }

            .nav {
              display: ${isNavOpen ? "flex" : "none"};
              padding: 10px;
              top: 45px;
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
              font-size: clamp(24px, 4vw, 30px);
              margin-bottom: 12px;
            }

            .hero-content p {
              font-size: clamp(14px, 2vw, 18px);
              margin-bottom: 15px;
            }

            .spiritual-svg {
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
              width: 50px;
              height: 2px;
            }

            .form-container {
              max-width: 95%;
            }

            .card {
              padding: 20px 15px;
              border-radius: 12px;
            }

            .card-icon {
              font-size: 32px;
              margin-bottom: 12px;
            }

            .card h3 {
              font-size: 18px;
              margin-bottom: 10px;
            }

            .card p {
              font-size: 13px;
              margin-bottom: 15px;
            }

            .form-field label {
              font-size: 13px;
              margin-bottom: 5px;
            }

            .form-field input,
            .form-field select {
              padding: 6px 10px;
              font-size: 12px;
              border-radius: 6px;
              min-height: 36px;
            }

            .card-button {
              padding: 8px 15px;
              font-size: 12px;
              max-width: 180px;
              min-height: 36px;
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
              font-size: 28px;
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
          .form-field input:focus,
          .form-field select:focus,
          .card-button:focus,
          .quick-button:focus,
          .chatbot-send-button:focus {
            outline: 2px solid #e9c46a;
            outline-offset: 2px;
          }

          .nav a:focus,
          .dropdown-item:focus,
          .footer-links a:focus {
            outline: 2px solid #e9c46a;
            outline-offset: 2px;
          }
        `}
      </style>

      <div className="main-container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-symbol">🪘</div>
            JYOTISH URJA
          </div>
          <div className="nav-container">
            <div className={`hamburger ${isNavOpen ? "open" : ""}`} onClick={toggleNav}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className="nav">
              <Link to="/dashboard#home">HOME</Link>
              <Link to="/dashboard#services">SERVICES</Link>
              <Link to="/dashboard#about">ABOUT</Link>
              <Link to="/dashboard#contact">CONTACT</Link>
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
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <svg className="spiritual-svg" viewBox="0 0 200 200">
              <path
                className="yantra-path"
                d="M100 20 L120 40 L160 40 L140 60 L160 80 L120 80 L100 100 L80 80 L40 80 L60 60 L40 40 L80 40 L100 20 M100 40 L120 60 L100 80 L80 60 L100 40 M100 60 L120 80 L100 100 L80 80 L100 60"
                fill="rgba(212, 175, 55, 0.2)"
                stroke="#d4af37"
                strokeWidth="2"
              />
              <path
                className="om-center"
                d="M100 90 C105 90, 110 92, 110 95 C110 98, 105 100, 100 100 C95 100, 90 98, 90 95 C90 92, 95 90, 100 90 M95 95 L90 100 M105 95 L110 100"
                fill="#d4af37"
                stroke="#e9c46a"
                strokeWidth="1"
              />
            </svg>
            <h1>Offline Consultation</h1>
            <p>Experience personalized Vedic astrology guidance in person with our expert astrologers for deep cosmic insights.</p>
          </div>
        </section>

        {/* Form Section */}
        <section className="section">
          <h2 className="section-title">Book Your Offline Consultation</h2>
          <div className="form-container">
            <div className="card">
              <div className="card-icon">🛕</div>
              <h3>Offline Consultation</h3>
              <p>₹1000 for a 30-minute in-person session with our Vedic astrology experts.</p>
              <form onSubmit={handleFormSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    aria-label="Full name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    aria-label="Date of birth"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="timeOfBirth">Time of Birth</label>
                  <input
                    id="timeOfBirth"
                    type="time"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleInputChange}
                    aria-label="Time of birth"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="placeOfBirth">Place of Birth</label>
                  <input
                    id="placeOfBirth"
                    type="text"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                    placeholder="Enter city and country"
                    aria-label="Place of birth"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="areaOfConcern">Area of Concern</label>
                  <select
                    id="areaOfConcern"
                    name="areaOfConcern"
                    value={formData.areaOfConcern}
                    onChange={handleInputChange}
                    aria-label="Area of concern"
                    required
                  >
                    <option value="" disabled>Select an area</option>
                    <option value="Career">Career</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button className="card-button" type="submit">
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Why We're Different Section */}
        <section className="section">
          <h2 className="section-title">Why Choose Jyotish Urja?</h2>
          <div className="usp-container">
            <div className="usp-card">
              <div className="usp-icon">🕉️</div>
              <h3>Vedic Authenticity</h3>
              <p>Our consultations are rooted in ancient Vedic wisdom, ensuring accurate and authentic astrological guidance.</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">🌟</div>
              <h3>Expert Astrologers</h3>
              <p>Connect with seasoned astrologers who blend traditional knowledge with modern insights for personalized advice.</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">💎</div>
              <h3>Holistic Approach</h3>
              <p>We integrate astrology, gemstone recommendations, and sacred rituals to empower your life's journey.</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">📱</div>
              <h3>Modern Accessibility</h3>
              <p>Seamless booking and secure payments make spiritual guidance accessible anytime, anywhere.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">Jyotish Urja</div>
            <p className="footer-description">
              Guiding you through the ancient wisdom of Vedic Astrology with personalized insights and spiritual guidance.
            </p>
            <div className="footer-links">
              <Link to="/dashboard#about">About Us</Link>
              <Link to="/dashboard#services">Services</Link>
              <Link to="/dashboard#contact">Contact</Link>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 Jyotish Urja. All rights reserved. | Designed with cosmic energy ✨</p>
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
              <p>Offline Consultation Support</p>
            </div>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "You" ? "user" : "bot"}`}>
                <strong>{msg.sender}: </strong>{msg.text}
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
              placeholder="Type your message..."
              aria-label="Chatbot message input"
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
              aria-label="Send chatbot message"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </>
  );
};

export default OfflineConsultation;
