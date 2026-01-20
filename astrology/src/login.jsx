
"use client";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("customer");
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Intersection Observer for fade-in
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    // Simulate login (replace with actual authentication logic)
    setTimeout(() => {
      alert(`Login successful! Redirecting to ${userType} dashboard...`);
      navigate(userType === "customer" ? "/dashboard" : "/admin-panel");
    }, 500);
  };

  // Handle button animation
  const handleButtonClick = (e) => {
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "";
    }, 150);
  };

  // Toggle between customer and admin login
  const toggleUserType = (type) => {
    setUserType(type);
    setEmail("");
    setPassword("");
    setError("");
  };

  // Toggle hamburger menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="min-h-screen relative">
      <style>{`
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
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cosmic-pattern {
          background-image: radial-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        header {
          display: flex;
          justify-content: center;
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

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1400px;
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

        nav {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        nav a {
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

        nav a::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
          transition: left 0.5s ease;
        }

        nav a:hover::before {
          left: 100%;
        }

        nav a:hover {
          border-color: #d4af37;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.2);
          background: rgba(212, 175, 55, 0.1);
        }

        .login-section {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 80px 40px 40px;
          position: relative;
          z-index: 5;
          width: 100%;
        }

        .login-container {
          background: rgba(26, 35, 50, 0.9);
          backdrop-filter: blur(8px);
          padding: 30px;
          border-radius: 15px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          max-width: 400px;
          width: 100%;
          text-align: center;
          animation: slideInUp 0.8s ease-out;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .login-container h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 36px);
          font-weight: 700;
          color: #d4af37;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .login-buttons {
          display: flex;
          gap: 10px;
          width: 100%;
          max-width: 350px;
          margin: 15px auto;
          justify-content: center;
        }

        .login-container button {
          background: #d4af37;
          color: #1a2332;
          border: none;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          position: relative;
          overflow: hidden;
          flex: 1;
          min-height: 44px;
        }

        .login-container button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .login-container button:hover::before {
          left: 100%;
        }

        .login-container button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
          background: linear-gradient(135deg, #e9c46a, #d4af37);
        }

        .toggle-btn {
          background: rgba(55, 65, 81, 0.8);
          color: #faf0e6;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #d4af37, #e9c46a);
          color: #1a2332;
        }

        .login-container input {
          width: 100%;
          max-width: 350px;
          padding: 10px 15px;
          margin: 8px auto;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 10px;
          background: rgba(55, 65, 81, 0.8);
          color: #faf0e6;
          font-size: 14px;
          transition: all 0.3s ease;
          min-height: 44px;
          display: block;
        }

        .login-container input:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
          background: rgba(55, 65, 81, 0.9);
          transform: translateY(-1px);
        }

        .error-message {
          color: #e76f51;
          font-size: 13px;
          margin: 8px auto;
          max-width: 350px;
          text-align: center;
        }

        .login-container p {
          margin: 15px auto;
          font-size: 14px;
          color: #d4af37;
          max-width: 350px;
          text-align: center;
        }

        .login-container a {
          color: #e9c46a;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .login-container a:hover {
          color: #f4a261;
        }

        .login-card {
          transform: translateY(0);
          transition: all 0.3s ease;
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
        }

        .submit-btn {
          background: linear-gradient(135deg, #d4af37, #e9c46a);
          max-width: 350px;
          width: 100%;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }

        .input-group {
          margin: 0 auto 1rem;
          max-width: 350px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .input-label {
          margin-bottom: 0.4rem;
          font-weight: 500;
          color: #d4af37;
          transition: all 0.3s ease;
          font-size: 14px;
          width: 100%;
          text-align: left;
        }

        input:focus + .input-label {
          transform: translateY(-1px);
          color: #f4c430;
        }

        /* Media Query for Tablets (max-width: 768px) */
        @media (max-width: 768px) {
          header {
            padding: 15px 20px;
          }

          .header-content {
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
            justify-content: center;
          }

          .hamburger {
            display: flex;
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
            align-items: center;
          }

          nav a {
            font-size: 13px;
            padding: 8px 15px;
            border-radius: 18px;
            width: 100%;
            max-width: 200px;
            text-align: center;
          }

          .login-section {
            padding: 100px 20px 20px;
          }

          .login-container {
            padding: 20px;
            max-width: 90%;
            border-radius: 12px;
          }

          .login-container h2 {
            font-size: clamp(24px, 4.5vw, 32px);
            margin-bottom: 12px;
          }

          .login-buttons {
            flex-direction: column;
            gap: 8px;
            margin: 12px auto;
            max-width: 300px;
          }

          .login-container button {
            padding: 10px 15px;
            font-size: 13px;
            border-radius: 20px;
            min-height: 40px;
          }

          .login-container input {
            padding: 8px 12px;
            font-size: 13px;
            border-radius: 8px;
            min-height: 40px;
            max-width: 300px;
          }

          .input-group {
            margin-bottom: 0.8rem;
            max-width: 300px;
          }

          .input-label {
            font-size: 13px;
            margin-bottom: 0.3rem;
          }

          .error-message {
            font-size: 12px;
            margin: 6px auto;
            max-width: 300px;
          }

          .login-container p {
            font-size: 13px;
            margin: 12px auto;
            max-width: 300px;
          }
        }

        /* Media Query for Small Mobile Devices (max-width: 480px) */
        @media (max-width: 480px) {
          header {
            padding: 10px 15px;
          }

          .header-content {
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

          nav {
            top: 50px;
            padding: 10px;
          }

          nav a {
            font-size: 12px;
            padding: 6px 12px;
            border-radius: 15px;
            min-height: 36px;
            max-width: 180px;
          }

          .login-section {
            padding: 80px 15px 15px;
          }

          .login-container {
            padding: 15px;
            max-width: 95%;
            border-radius: 10px;
          }

          .login-container h2 {
            font-size: clamp(20px, 4vw, 28px);
            margin-bottom: 10px;
          }

          .login-buttons {
            gap: 6px;
            margin: 10px auto;
            max-width: 280px;
          }

          .login-container button {
            padding: 8px 12px;
            font-size: 12px;
            border-radius: 18px;
            min-height: 36px;
          }

          .login-container input {
            padding: 6px 10px;
            font-size: 12px;
            border-radius: 6px;
            min-height: 36px;
            max-width: 280px;
          }

          .input-group {
            margin-bottom: 0.6rem;
            max-width: 280px;
          }

          .input-label {
            font-size: 12px;
            margin-bottom: 0.2rem;
          }

          .error-message {
            font-size: 11px;
            margin: 5px auto;
            max-width: 280px;
          }

          .login-container p {
            font-size: 12px;
            margin: 10px auto;
            max-width: 280px;
          }
        }

        /* Accessibility Enhancements */
        .login-container input:focus,
        .login-container button:focus,
        nav a:focus,
        .login-container a:focus {
          outline: 2px solid #e9c46a;
          outline-offset: 2px;
        }
      `}</style>

      <div className="cosmic-pattern"></div>

      <header>
        <div className="header-content">
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
            <nav>
              <Link to="/#home">HOME</Link>
              <Link to="/#about">ABOUT</Link>
              <Link to="/login">LOGIN</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="login-section">
        <div className="login-container fade-in login-card">
          <h2>{userType === "customer" ? "Customer Login" : "Admin Login"}</h2>
          <div className="login-buttons">
            <button
              className={`toggle-btn ${userType === "customer" ? "active" : ""}`}
              onClick={() => toggleUserType("customer")}
              aria-label="Switch to customer login"
            >
              CUSTOMER
            </button>
            <button
              className={`toggle-btn ${userType === "admin" ? "active" : ""}`}
              onClick={() => toggleUserType("admin")}
              aria-label="Switch to admin login"
            >
              ADMIN
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button
              className="submit-btn"
              type="submit"
              onClick={handleButtonClick}
              aria-label="Login"
            >
              LOGIN
            </button>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p>
              Forgot your password?{" "}
              <Link to="/forgotpassword">Reset Password</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
