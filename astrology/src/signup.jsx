
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./api/api";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
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

  // Password validation
  useEffect(() => {
    const validatePassword = () => {
      setPasswordCriteria({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    };
    validatePassword();
  }, [password]);

  // Email validation
  useEffect(() => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  }, [email]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (emailError) {
      setError("Please correct the email format.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      !passwordCriteria.length ||
      !passwordCriteria.uppercase ||
      !passwordCriteria.lowercase ||
      !passwordCriteria.number ||
      !passwordCriteria.special
    ) {
      setError("Password does not meet all criteria.");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(name, email, password);
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle hamburger menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
            background: rgba(26, 35, 50, 0.8);
            border-bottom: 1px solid rgba(212, 175, 55, 0.1);
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
            animation: glow 3s ease-in-out infinite alternate;
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

          .signup-section {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding-top: 80px;
            padding-bottom: 20px;
            position: relative;
            z-index: 5;
            width: 100%;
            padding-left: 15px;
            padding-right: 15px;
          }

          .signup-container {
            background: rgba(26, 35, 50, 0.85);
            backdrop-filter: blur(8px);
            padding: 30px;
            border-radius: 15px;
            border: 1px solid rgba(212, 175, 55, 0.2);
            max-width: 400px;
            width: 100%;
            text-align: center;
            animation: slideInUp 0.8s ease-out;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          @keyframes slideInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .signup-container h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(28px, 5vw, 36px);
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }

          .signup-container input {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            color: #faf0e6;
            font-size: 14px;
            font-family: 'Source Sans 3', sans-serif;
            transition: all 0.3s ease;
            min-height: 44px;
          }

          .signup-container input:focus {
            outline: none;
            border-color: #d4af37;
            box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
          }

          .signup-container button {
            background: #d4af37;
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
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
            margin-top: 15px;
            font-family: 'Source Sans 3', sans-serif;
            width: 100%;
            max-width: 250px;
            min-height: 44px;
          }

          .signup-container button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
          }

          .signup-container button:hover::before {
            left: 100%;
          }

          .signup-container button:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
            background: rgba(212, 175, 55, 0.9);
          }

          .error-message {
            color: #e76f51;
            font-size: 13px;
            margin-top: 8px;
            font-family: 'Source Sans 3', sans-serif;
            line-height: 1.4;
          }

          .signup-container p {
            margin-top: 15px;
            font-size: 14px;
            color: #d4af37;
            font-family: 'Source Sans 3', sans-serif;
          }

          .signup-container a {
            color: #e9c46a;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .signup-container a:hover {
            color: #f4a261;
          }

          .password-criteria {
            text-align: left;
            margin: 8px 0;
            font-size: 13px;
            color: #d4af37;
            font-family: 'Source Sans 3', sans-serif;
          }

          .criteria-item {
            display: flex;
            align-items: center;
            margin: 4px 0;
          }

          .criteria-item span {
            margin-right: 8px;
            font-size: 14px;
          }

          .criteria-item.valid span::before {
            content: '✔';
            color: #2a9d8f;
          }

          .criteria-item.invalid span::before {
            content: '✘';
            color: #e76f51;
          }

          /* Media Query for Tablets (max-width: 768px) */
          @media (max-width: 768px) {
            header {
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

            .nav-container {
              width: 100%;
              position: relative;
            }

            .hamburger {
              display: flex;
            }

            nav {
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

            nav a {
              font-size: 13px;
              padding: 8px 15px;
              border-radius: 18px;
              text-align: center;
            }

            .signup-section {
              padding-top: 100px;
              padding-bottom: 15px;
              padding-left: 10px;
              padding-right: 10px;
            }

            .signup-container {
              padding: 25px;
              max-width: 90%;
              border-radius: 12px;
            }

            .signup-container h2 {
              font-size: clamp(24px, 4.5vw, 30px);
              margin-bottom: 12px;
            }

            .signup-container input {
              padding: 10px;
              margin: 6px 0;
              font-size: 13px;
              border-radius: 7px;
              min-height: 40px;
            }

            .signup-container button {
              padding: 10px 20px;
              font-size: 13px;
              max-width: 200px;
              min-height: 40px;
              margin-top: 12px;
            }

            .error-message {
              font-size: 12px;
              margin-top: 6px;
            }

            .signup-container p {
              font-size: 13px;
              margin-top: 12px;
            }

            .password-criteria {
              font-size: 12px;
              margin: 6px 0;
            }

            .criteria-item {
              margin: 3px 0;
            }

            .criteria-item span {
              font-size: 13px;
              margin-right: 6px;
            }
          }

          /* Media Query for Small Mobile Devices (max-width: 480px) */
          @media (max-width: 480px) {
            header {
              padding: 10px 15px;
              gap: 10px;
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

            .hamburger {
              display: flex;
            }

            nav {
              display: ${isNavOpen ? "flex" : "none"};
              padding: 10px;
              top: 45px;
            }

            nav a {
              font-size: 12px;
              padding: 6px 12px;
              border-radius: 15px;
            }

            .signup-section {
              padding-top: 80px;
              padding-bottom: 10px;
              padding-left: 5px;
              padding-right: 5px;
            }

            .signup-container {
              padding: 20px;
              max-width: 95%;
              border-radius: 10px;
            }

            .signup-container h2 {
              font-size: clamp(20px, 4vw, 24px);
              margin-bottom: 10px;
            }

            .signup-container input {
              padding: 8px;
              margin: 5px 0;
              font-size: 12px;
              border-radius: 6px;
              min-height: 36px;
            }

            .signup-container button {
              padding: 8px 15px;
              font-size: 12px;
              max-width: 180px;
              min-height: 36px;
              margin-top: 10px;
            }

            .error-message {
              font-size: 11px;
              margin-top: 5px;
            }

            .signup-container p {
              font-size: 12px;
              margin-top: 10px;
            }

            .password-criteria {
              font-size: 11px;
              margin: 5px 0;
            }

            .criteria-item {
              margin: 2px 0;
            }

            .criteria-item span {
              font-size: 12px;
              margin-right: 5px;
            }
          }

          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
          }

          .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>

      <header>
        <div className="logo">
          <div className="logo-symbol">ॐ</div>
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
      </header>

      <section className="signup-section">
        <div className="signup-container fade-in">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Full Name"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                aria-describedby="email-error"
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                aria-describedby="password-criteria"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-label="Confirm password"
                required
              />
              <div className="password-criteria" id="password-criteria">
                <div
                  className={`criteria-item ${passwordCriteria.length ? "valid" : "invalid"
                    }`}
                >
                  <span></span> At least 8 characters
                </div>
                <div
                  className={`criteria-item ${passwordCriteria.uppercase ? "valid" : "invalid"
                    }`}
                >
                  <span></span> At least one uppercase letter
                </div>
                <div
                  className={`criteria-item ${passwordCriteria.lowercase ? "valid" : "invalid"
                    }`}
                >
                  <span></span> At least one lowercase letter
                </div>
                <div
                  className={`criteria-item ${passwordCriteria.number ? "valid" : "invalid"
                    }`}
                >
                  <span></span> At least one number
                </div>
                <div
                  className={`criteria-item ${passwordCriteria.special ? "valid" : "invalid"
                    }`}
                >
                  <span></span> At least one special character
                </div>
              </div>
              {error && <div className="error-message" id="email-error">{error}</div>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "SIGNING UP..." : "SIGN UP"}
              </button>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
