import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  // Simulate sending OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    // Simulate OTP generation (replace with actual email sending logic)
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    alert(`OTP sent to ${email}: ${newOtp} (Simulated for demo)`);
  };

  // Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    if (otp === generatedOtp) {
      navigate("/create-password");
    } else {
      setError("Invalid OTP. Please try again or resend OTP.");
    }
  };

  // Resend OTP
  const handleResendOtp = (e) => {
    e.preventDefault();
    setError("");
    setOtp("");
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    alert(`New OTP sent to ${email}: ${newOtp} (Simulated for demo)`);
  };

  // Handle button animation
  const handleButtonClick = (e) => {
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "";
    }, 150);
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
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 50px;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10;
            backdrop-filter: blur(10px);
            background: rgba(26, 35, 50, 0.8);
            border-bottom: 1px solid rgba(212, 175, 55, 0.1);
          }

          .logo {
            display: flex;
            align-items: center;
            font-size: 24px;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #d4af37;
          }

          .logo-symbol {
            width: 60px;
            height: 60px;
            background: transparent;
            border: 2px solid #d4af37;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 15px;
            font-size: 16px;
            color: #d4af37;
            position: relative;
            animation: glow 3s ease-in-out infinite alternate;
          }

          .logo-symbol::before {
            content: '🔱';
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
          }

          .logo-symbol::after {
            content: '⚡';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
          }

          @keyframes glow {
            0% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
            100% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.6); }
          }

          nav a {
            color: #d4af37;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            padding: 12px 24px;
            border: 2px solid transparent;
            border-radius: 25px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
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
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
          }

          .forgot-password-section {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding-top: 100px;
            padding-bottom: 20px;
            position: relative;
            z-index: 5;
            width: 100vw;
          }

          .forgot-password-container {
            background: rgba(26, 35, 50, 0.8);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(212, 175, 55, 0.2);
            max-width: 400px;
            width: 100%;
            text-align: center;
            animation: slideInUp 1s ease-out;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          @keyframes slideInUp {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .forgot-password-container h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(36px, 6vw, 48px);
            font-weight: 700;
            color: #d4af37;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .forgot-password-container input {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            color: #faf0e6;
            font-size: 16px;
            font-family: 'Source Sans 3', sans-serif;
            transition: all 0.3s ease;
          }

          .forgot-password-container input:focus {
            outline: none;
            border-color: #d4af37;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
          }

          .forgot-password-container button {
            background: #d4af37;
            color: #1a2332;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
            margin-top: 20px;
            font-family: 'Source Sans 3', sans-serif;
            width: 100%;
          }

          .forgot-password-container button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
          }

          .forgot-password-container button:hover::before {
            left: 100%;
          }

          .forgot-password-container button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 12px 48px rgba(212, 175, 55, 0.5);
            background: rgba(212, 175, 55, 0.9);
          }

          .resend-button {
            background: transparent;
            border: 2px solid #d4af37;
            color: #d4af37;
            margin-top: 10px;
          }

          .resend-button:hover {
            background: #d4af37;
            color: #1a2332;
          }

          .error-message {
            color: #e76f51;
            font-size: 14px;
            margin-top: 10px;
            font-family: 'Source Sans 3', sans-serif;
          }

          .forgot-password-container p {
            margin-top: 20px;
            font-size: 16px;
            color: #d4af37;
            font-family: 'Source Sans 3', sans-serif;
          }

          .forgot-password-container a {
            color: #e9c46a;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .forgot-password-container a:hover {
            color: #f4a261;
          }

          @media (max-width: 768px) {
            header {
              padding: 20px 25px;
              flex-direction: column;
              gap: 20px;
            }

            .logo {
              font-size: 24px;
            }

            .logo-symbol {
              width: 50px;
              height: 50px;
              font-size: 24px;
            }

            nav {
              flex-wrap: wrap;
              justify-content: center;
            }

            .forgot-password-section {
              padding-top: 120px;
              padding-bottom: 20px;
            }

            .forgot-password-container {
              padding: 30px;
              max-width: 90%;
            }
          }

          .fade-in {
            opacity: 0;
            transform: translateY(30px);
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
        <nav>
          <Link to="/#home">HOME</Link>
          <Link to="/#about">ABOUT</Link>
          <Link to="/login">LOGIN</Link>
        </nav>
      </header>

      <section className="forgot-password-section">
        <div className="forgot-password-container fade-in">
          <h2>Forgot Password</h2>
          <div>
            {!otpSent ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    handleSendOtp(e);
                    handleButtonClick(e);
                  }}
                >
                  SEND OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    handleVerifyOtp(e);
                    handleButtonClick(e);
                  }}
                >
                  VERIFY OTP
                </button>
                <button
                  className="resend-button"
                  onClick={(e) => {
                    handleResendOtp(e);
                    handleButtonClick(e);
                  }}
                >
                  RESEND OTP
                </button>
              </>
            )}
            {error && <div className="error-message">{error}</div>}
            <p>
              Back to <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
