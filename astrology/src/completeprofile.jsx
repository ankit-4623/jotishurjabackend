
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [gender, setGender] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully!");
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
            font-family: 'Playfair Display', serif;
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
            font-family: 'Playfair Display', serif;
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

          .single-card-container {
            max-width: 700px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .card {
            background: rgba(26, 35, 50, 0.9);
            backdrop-filter: blur(8px);
            padding: 30px 25px;
            border-radius: 15px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(212, 175, 55, 0.2);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 500px;
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
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
            border-color: rgba(212, 175, 55, 0.4);
          }

          .card form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .card label {
            font-size: 16px;
            color: #d4af37;
            font-weight: 600;
            text-align: left;
            width: 100%;
            max-width: 350px;
          }

          .card input,
          .card select {
            width: 100%;
            max-width: 350px;
            padding: 10px 15px;
            font-size: 14px;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 10px;
            background: rgba(26, 35, 50, 0.8);
            color: #faf0e6;
            transition: all 0.3s ease;
          }

          .card input:focus,
          .card select:focus {
            border-color: #d4af37;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
            outline: none;
          }

          .card input::placeholder {
            color: rgba(212, 175, 55, 0.5);
          }

          .card-button {
            background: linear-gradient(135deg, #d4af37, #e9c46a);
            color: #1a2332;
            border: none;
            padding: 12px 30px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
            margin-top: 15px;
          }

          .card-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s ease;
          }

          .card-button:hover::before {
            left: 100%;
          }

          .card-button:hover {
            background: linear-gradient(135deg, #e9c46a, #d4af37);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
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
            font-family: 'Playfair Display', serif;
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

            .single-card-container {
              max-width: 90%;
            }

            .card {
              padding: 20px 15px;
              border-radius: 12px;
              max-width: 100%;
            }

            .card label {
              font-size: 14px;
              max-width: 100%;
            }

            .card input,
            .card select {
              max-width: 100%;
              padding: 8px 12px;
              font-size: 13px;
              border-radius: 8px;
            }

            .card-button {
              padding: 10px 25px;
              font-size: 13px;
              border-radius: 18px;
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
              width: 50px;
              height: 2px;
            }

            .single-card-container {
              max-width: 95%;
            }

            .card {
              padding: 15px 12px;
              border-radius: 10px;
            }

            .card label {
              font-size: 13px;
            }

            .card input,
            .card select {
              padding: 6px 10px;
              font-size: 12px;
              border-radius: 6px;
            }

            .card-button {
              padding: 8px 20px;
              font-size: 12px;
              border-radius: 15px;
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
          }

          /* Accessibility Enhancements */
          .nav a:focus,
          .dropdown-item:focus,
          .card-button:focus,
          .card input:focus,
          .card select:focus {
            outline: 2px solid #e9c46a;
            outline-offset: 2px;
          }
        `}
      </style>

      <div className="main-container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-symbol">🪷</div>
            JYOTISH URJA
          </div>
          <div className="nav-container">
            <div className={`hamburger ${isNavOpen ? "open" : ""}`} onClick={toggleNav}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className="nav">
              <Link to="/dashboard">HOME</Link>
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
                <span className="dropdown-item disabled">
                  Complete Profile
                </span>
                <Link to="/faq" className="dropdown-item">
                  FAQ Section
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Section */}
        <section className="section" id="profile">
          <h2 className="section-title">Complete Your Profile</h2>
          <div className="single-card-container">
            <div className="card">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />

                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />

                <label htmlFor="birthTime">Time of Birth</label>
                <input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  required
                />

                <label htmlFor="birthPlace">Place of Birth</label>
                <input
                  id="birthPlace"
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  required
                  placeholder="Enter city, country"
                />

                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <button className="card-button" type="submit">
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">Jyotish Urja</div>
            <p className="footer-description">
              Guiding you through the ancient wisdom of Vedic Astrology with
              personalized insights and spiritual guidance for a meaningful life
              journey.
            </p>
            <div className="footer-links">
              <Link to="/dashboard#about">About Us</Link>
              <Link to="/dashboard#services">Services</Link>
              <Link to="/dashboard#contact">Contact</Link>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
            <div className="footer-bottom">
              <p>
                &copy; 2025 Jyotish Urja. All rights reserved. | Designed with
                cosmic energy ✨
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Profile;
