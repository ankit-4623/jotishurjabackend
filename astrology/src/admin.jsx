"use client";

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for gemstone orders
const mockGemstoneOrders = [
  {
    id: 1,
    item: "Ruby Gemstone",
    status: "pending",
    amount: 50,
    place: "New York",
  },
  {
    id: 2,
    item: "Emerald Gemstone",
    status: "completed",
    amount: 100,
    place: "London",
  },
  {
    id: 3,
    item: "Sapphire Gemstone",
    status: "pending",
    amount: 75,
    place: "Paris",
  },
  {
    id: 4,
    item: "Diamond Gemstone",
    status: "completed",
    amount: 150,
    place: "Berlin",
  },
  {
    id: 5,
    item: "Amethyst Gemstone",
    status: "pending",
    amount: 60,
    place: "Tokyo",
  },
  {
    id: 6,
    item: "Topaz Gemstone",
    status: "completed",
    amount: 120,
    place: "Sydney",
  },
];

// Mock data for astrology solution orders
const mockAstroOrders = [
  {
    id: 1,
    name: "John Doe",
    phone: "1234567890",
    email: "john@example.com",
    dob: "1990-01-01",
    birthTime: "12:00 PM",
    birthPlace: "New York",
    item: "Horoscope Reading",
    status: "pending",
    amount: 50,
    place: "New York",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "0987654321",
    email: "jane@example.com",
    dob: "1985-05-15",
    birthTime: "08:30 AM",
    birthPlace: "London",
    item: "Kundali Matching",
    status: "completed",
    amount: 100,
    place: "London",
  },
  {
    id: 3,
    name: "Alice Johnson",
    phone: "1122334455",
    email: "alice@example.com",
    dob: "1992-07-22",
    birthTime: "03:45 PM",
    birthPlace: "Paris",
    item: "Palmistry Session",
    status: "pending",
    amount: 75,
    place: "Paris",
  },
  {
    id: 4,
    name: "Bob Brown",
    phone: "5566778899",
    email: "bob@example.com",
    dob: "1988-03-10",
    birthTime: "10:15 AM",
    birthPlace: "Berlin",
    item: "Vastu Consultation",
    status: "completed",
    amount: 150,
    place: "Berlin",
  },
  {
    id: 5,
    name: "Charlie Davis",
    phone: "6677889900",
    email: "charlie@example.com",
    dob: "1995-11-30",
    birthTime: "05:00 PM",
    birthPlace: "Tokyo",
    item: "Horoscope Reading",
    status: "pending",
    amount: 60,
    place: "Tokyo",
  },
  {
    id: 6,
    name: "Dana Evans",
    phone: "7788990011",
    email: "dana@example.com",
    dob: "1980-09-05",
    birthTime: "02:20 AM",
    birthPlace: "Sydney",
    item: "Kundali Matching",
    status: "completed",
    amount: 120,
    place: "Sydney",
  },
];

const mockConsultancies = [
  {
    id: 1,
    name: "John Doe",
    dob: "1990-01-01",
    birthTime: "12:00 PM",
    birthPlace: "New York",
    type: "video",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    dob: "1985-05-15",
    birthTime: "08:30 AM",
    birthPlace: "London",
    type: "audio",
    status: "completed",
  },
  {
    id: 3,
    name: "Alice Johnson",
    dob: "1992-07-22",
    birthTime: "03:45 PM",
    birthPlace: "Paris",
    type: "offline",
    status: "pending",
  },
  {
    id: 4,
    name: "Bob Brown",
    dob: "1988-03-10",
    birthTime: "10:15 AM",
    birthPlace: "Berlin",
    type: "video",
    status: "pending",
  },
  {
    id: 5,
    name: "Charlie Davis",
    dob: "1995-11-30",
    birthTime: "05:00 PM",
    birthPlace: "Tokyo",
    type: "audio",
    status: "completed",
  },
  {
    id: 6,
    name: "Dana Evans",
    dob: "1980-09-05",
    birthTime: "02:20 AM",
    birthPlace: "Sydney",
    type: "offline",
    status: "pending",
  },
];

const mockPujaBookings = [
  {
    id: 1,
    name: "Puja for Health",
    customer: "John Doe",
    date: "2025-10-01",
    status: "pending",
  },
  {
    id: 2,
    name: "Puja for Wealth",
    customer: "Jane Smith",
    date: "2025-10-05",
    status: "completed",
  },
  {
    id: 3,
    name: "Puja for Peace",
    customer: "Alice Johnson",
    date: "2025-10-10",
    status: "pending",
  },
];

const AdminPanel = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [consultStatusFilter, setConsultStatusFilter] = useState("all");
  const [gemstoneOrderStatusFilter, setGemstoneOrderStatusFilter] =
    useState("all");
  const [astroOrderStatusFilter, setAstroOrderStatusFilter] = useState("all");
  const [pujaStatusFilter, setPujaStatusFilter] = useState("all");
  const [dashboardYearFilter, setDashboardYearFilter] = useState("all");
  const [gemstoneData, setGemstoneData] = useState({
    name: "",
    rate: "",
    description: "",
    images: [],
  });
  const [galleryData, setGalleryData] = useState({ photos: [], videos: [] });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [gemstoneOrders, setGemstoneOrders] = useState(mockGemstoneOrders);
  const [astroOrders, setAstroOrders] = useState(mockAstroOrders);
  const dashboardRef = useRef(null);

  // Toggle hamburger menu
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Handle status change for gemstone orders
  const handleGemstoneStatusChange = (id, newStatus) => {
    setGemstoneOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Handle status change for astrology orders
  const handleAstroStatusChange = (id, newStatus) => {
    setAstroOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Dashboard calculations
  const filteredGemstoneOrdersForDashboard = gemstoneOrders.filter(
    (order) =>
      gemstoneOrderStatusFilter === "all" ||
      order.status === gemstoneOrderStatusFilter
  );

  const filteredAstroOrdersForDashboard = astroOrders.filter(
    (order) =>
      astroOrderStatusFilter === "all" ||
      order.status === astroOrderStatusFilter
  );

  const pendingGemstoneOrders = gemstoneOrders.filter(
    (order) => order.status === "pending"
  ).length;
  const pendingAstroOrders = astroOrders.filter(
    (order) => order.status === "pending"
  ).length;
  const pendingConsultancies = mockConsultancies.filter(
    (consult) => consult.status === "pending"
  ).length;
  const totalGemstoneEarnings = gemstoneOrders.reduce(
    (sum, order) => sum + order.amount,
    0
  );
  const totalAstroEarnings = astroOrders.reduce(
    (sum, order) => sum + order.amount,
    0
  );
  const totalEarnings = totalGemstoneEarnings + totalAstroEarnings;

  // Yearly revenue data
  const revenueByYear = {
    2023: [200, 300, 150, 400, 250, 500, 350, 450, 300, 400, 200, 600],
    2024: [300, 400, 200, 500, 350, 600, 450, 550, 400, 500, 300, 700],
    2025: [250, 350, 175, 450, 300, 550, 400, 500, 350, 450, 250, 650],
  };

  const earningsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: `Earnings ($) - ${dashboardYearFilter === "all" ? "All Years" : dashboardYearFilter
          }`,
        data:
          dashboardYearFilter === "all"
            ? revenueByYear[2023].map(
              (val, idx) =>
                val +
                (revenueByYear[2024][idx] || 0) +
                (revenueByYear[2025][idx] || 0)
            )
            : revenueByYear[dashboardYearFilter] || revenueByYear[2023],
        backgroundColor: "rgba(212, 175, 55, 0.6)",
        borderColor: "#d4af37",
        borderWidth: 1,
      },
    ],
  };

  const earningsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#faf0e6", font: { size: 14 } },
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        color: "#d4af37",
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: "#faf0e6", font: { size: 12 } } },
      y: { ticks: { color: "#faf0e6", font: { size: 12 } } },
    },
  };

  // Filtered data for other tabs
  const filteredConsultancies = mockConsultancies.filter(
    (consult) =>
      consultStatusFilter === "all" || consult.status === consultStatusFilter
  );

  const filteredGemstoneOrders = gemstoneOrders.filter(
    (order) =>
      gemstoneOrderStatusFilter === "all" ||
      order.status === gemstoneOrderStatusFilter
  );

  const filteredAstroOrders = astroOrders.filter(
    (order) =>
      astroOrderStatusFilter === "all" ||
      order.status === astroOrderStatusFilter
  );

  const filteredPujaBookings = mockPujaBookings.filter(
    (puja) => pujaStatusFilter === "all" || puja.status === pujaStatusFilter
  );

  // Handle gemstone form input changes
  const handleGemstoneChange = (e) => {
    const { name, value } = e.target;
    setGemstoneData({ ...gemstoneData, [name]: value });
  };

  // Handle gemstone image uploads
  const handleGemstoneImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const validImages = files.filter((file) => file.type.startsWith("image/"));
    if (validImages.length !== files.length) {
      alert("Only image files are allowed!");
    }
    const imageUrls = validImages.map((file) => URL.createObjectURL(file));
    setGemstoneData({ ...gemstoneData, images: imageUrls });
  };

  // Handle gallery uploads
  const handleGalleryUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) =>
      type === "photos"
        ? file.type.startsWith("image/")
        : file.type.startsWith("video/")
    );
    if (validFiles.length !== files.length) {
      alert(`Only ${type === "photos" ? "image" : "video"} files are allowed!`);
    }
    const fileUrls = validFiles.map((file) => URL.createObjectURL(file));
    setGalleryData({
      ...galleryData,
      [type]: [...galleryData[type], ...fileUrls],
    });
  };

  // Handle gemstone form submission
  const handleGemstoneSubmit = (e) => {
    e.preventDefault();
    alert(`Gemstone Uploaded: ${JSON.stringify(gemstoneData)}`);
    setGemstoneData({
      name: "",
      rate: "",
      description: "",
      images: [],
    });
  };

  // Handle gallery submission
  const handleGallerySubmit = (type) => {
    alert(
      `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`
    );
  };

  // Download dashboard as PDF
  const downloadPDF = async () => {
    const canvas = await html2canvas(dashboardRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("dashboard.pdf");
  };

  return (
    <div className="admin-panel">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

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

        .admin-panel {
          min-height: 100vh;
          width: 100%;
          max-width: 1600px;
          padding: 100px 16px 32px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cosmic-pattern {
          background-image: radial-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px);
          background-size: 24px 24px;
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
          padding: 16px 24px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 10;
          backdrop-filter: blur(8px);
          background: rgba(26, 35, 50, 0.85);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1600px;
          flex-wrap: wrap;
        }

        .logo {
          display: flex;
          align-items: center;
          font-size: 20px;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #d4af37;
        }

        .logo-symbol {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
          border: 2px solid #d4af37;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 8px;
          font-size: 16px;
          color: #d4af37;
          animation: glow 3.5s ease-in-out infinite alternate;
        }

        @keyframes glow {
          0% { box-shadow: 0 0 12px rgba(212, 175, 55, 0.3), inset 0 0 8px rgba(212, 175, 55, 0.1); transform: scale(1); }
          100% { box-shadow: 0 0 24px rgba(212, 175, 55, 0.6), inset 0 0 12px rgba(212, 175, 55, 0.2); transform: scale(1.03); }
        }

        .nav-container {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
          z-index: 11;
        }

        .hamburger span {
          width: 28px;
          height: 3px;
          background: #d4af37;
          border-radius: 2px;
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
          border-radius: 20px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        nav a::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
          transition: left 0.4s ease;
        }

        nav a:hover::before {
          left: 100%;
        }

        nav a:hover, nav a:focus {
          border-color: #d4af37;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.2);
          background: rgba(212, 175, 55, 0.1);
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 6vw, 36px);
          font-weight: 700;
          color: #d4af37;
          text-align: center;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #d4af37;
          text-align: center;
          margin-bottom: 16px;
        }

        h3 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #d4af37;
        }

        .admin-content {
          display: flex;
          flex-direction: row;
          gap: 20px;
          width: 100%;
          align-items: flex-start;
          justify-content: center;
        }

        .main-content {
          flex: 1;
          max-width: 1100px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sidebar {
          width: 100%;
          max-width: 280px;
          background: rgba(26, 35, 50, 0.9);
          backdrop-filter: blur(8px);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          order: -1;
        }

        .tab-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: flex-start;
        }

        .tab-button {
          padding: 10px 20px;
          background: transparent;
          color: #d4af37;
          border: 2px solid #d4af37;
          border-radius: 20px;
          cursor: pointer;
          font-family: 'Source Sans 3', sans-serif;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          text-align: center;
          width: 100%;
          touch-action: manipulation;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #d4af37, #e9c46a);
          color: #1a2332;
        }

        .tab-button:hover, .tab-button:focus {
          background: rgba(212, 175, 55, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .dashboard-stats {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-card {
          background: rgba(26, 35, 50, 0.9);
          backdrop-filter: blur(8px);
          padding: 20px;
          border-radius: 12px;
          flex: 1;
          min-width: 200px;
          max-width: 280px;
          text-align: center;
          border: 1px solid rgba(212, 175, 55, 0.2);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(212, 175, 55, 0.3);
        }

        .stat-card h3 {
          font-family: 'Source Sans 3', sans-serif;
          font-size: 16px;
          margin-bottom: 10px;
          color: #d4af37;
        }

        .stat-card p {
          font-size: 22px;
          color: #e9c46a;
        }

        .chart-container {
          max-width: 100%;
          width: 100%;
          margin: 0 auto 20px;
          background: rgba(26, 35, 50, 0.9);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          overflow-x: auto;
        }

        table {
          width: 100%;
          max-width: 100%;
          border-collapse: collapse;
          background: rgba(26, 35, 50, 0.9);
          border-radius: 12px;
          overflow: hidden;
          margin: 0 auto 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        th, td {
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 12px;
          text-align: left;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
        }

        th {
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          font-weight: 600;
          position: sticky;
          top: 0;
          z-index: 1;
        }

        td {
          color: #faf0e6;
        }

        .filter-container {
          margin-bottom: 20px;
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .filter-container label {
          color: #d4af37;
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 8px;
        }

        select, input, textarea {
          padding: 8px 12px;
          background: rgba(26, 35, 50, 0.8);
          color: #faf0e6;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 8px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          width: 100%;
          max-width: 100%;
          margin: 0;
          transition: all 0.3s ease;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        select:focus, input:focus, textarea:focus {
          outline: none;
          border-color: #e9c46a;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
        }

        textarea {
          resize: vertical;
          min-height: 100px;
          max-width: 100%;
        }

        .download-btn, .submit-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #d4af37, #e9c46a);
          color: #1a2332;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-family: 'Source Sans 3', sans-serif;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          margin: 12px auto;
          display: block;
          max-width: 200px;
          text-align: center;
          touch-action: manipulation;
        }

        .download-btn:hover, .submit-btn:hover, .download-btn:focus, .submit-btn:focus {
          background: linear-gradient(135deg, #e9c46a, #d4af37);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
        }

        .gemstone-form, .gallery-form {
          background: rgba(26, 35, 50, 0.9);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .gemstone-form h3, .gallery-form h3 {
          font-family: 'Playfair Display', serif;
          color: #d4af37;
          margin-bottom: 20px;
          text-align: center;
          font-size: 20px;
        }

        .form-group {
          margin-bottom: 16px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .form-group label {
          color: #d4af37;
          font-weight: 500;
          margin-bottom: 6px;
          font-size: 14px;
          width: 100%;
        }

        .image-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 12px;
        }

        .image-preview img, .gallery-preview img {
          max-width: 100px;
          height: auto;
          border-radius: 8px;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .gallery-preview video {
          max-width: 150px;
          height: auto;
          border-radius: 8px;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        /* Responsive table for mobile */
        .responsive-table {
          display: none;
        }

        @media (max-width: 768px) {
          header {
            padding: 12px 16px;
          }

          .header-content {
            flex-direction: column;
            gap: 12px;
          }

          .logo {
            font-size: 18px;
          }

          .logo-symbol {
            width: 40px;
            height: 40px;
            font-size: 14px;
            margin-right: 6px;
          }

          .nav-container {
            width: 100%;
            justify-content: flex-end;
          }

          .hamburger {
            display: flex;
          }

          nav {
            display: ${isNavOpen ? "flex" : "none"};
            flex-direction: column;
            gap: 8px;
            width: 100%;
            background: rgba(26, 35, 50, 0.95);
            padding: 12px;
            position: absolute;
            top: 60px;
            left: 0;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            align-items: center;
            z-index: 10;
          }

          nav a {
            font-size: 13px;
            padding: 8px 16px;
            border-radius: 16px;
            max-width: 180px;
            width: 100%;
            text-align: center;
          }

          .admin-panel {
            padding: 80px 12px 24px;
          }

          .admin-content {
            flex-direction: column;
            align-items: center;
          }

          .sidebar {
            max-width: 100%;
            margin-bottom: 16px;
            order: 0;
            padding: 16px;
            border-radius: 8px;
          }

          .tab-buttons {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }

          .tab-button {
            min-width: 100px;
            font-size: 13px;
            padding: 8px 16px;
            border-radius: 16px;
          }

          .dashboard-stats {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .stat-card {
            min-width: 100%;
            max-width: 100%;
            padding: 16px;
            border-radius: 8px;
          }

          .chart-container {
            max-width: 100%;
            padding: 16px;
            height: 300px;
          }

          table {
            display: none;
          }

          .responsive-table {
            display: block;
            width: 100%;
          }

          .table-card {
            background: rgba(26, 35, 50, 0.9);
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }

          .table-card h4 {
            font-family: 'Source Sans 3', sans-serif;
            font-size: 14px;
            color: #d4af37;
            margin-bottom: 8px;
          }

          .table-card p {
            font-size: 13px;
            color: #faf0e6;
            margin-bottom: 6px;
          }

          .table-card select {
            width: 100%;
            max-width: 100%;
            padding: 8px;
            margin-top: 8px;
          }

          .filter-container {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          select, input, textarea {
            font-size: 13px;
            padding: 8px 10px;
            border-radius: 6px;
          }

          .download-btn, .submit-btn {
            max-width: 180px;
            font-size: 13px;
            padding: 8px 16px;
            border-radius: 16px;
          }

          .gemstone-form, .gallery-form {
            max-width: 100%;
            padding: 16px;
            border-radius: 8px;
          }

          .image-preview img, .gallery-preview img {
            max-width: 80px;
          }

          .gallery-preview video {
            max-width: 120px;
          }
        }

        @media (max-width: 480px) {
          header {
            padding: 10px 12px;
          }

          .header-content {
            gap: 8px;
          }

          .logo {
            font-size: 16px;
          }

          .logo-symbol {
            width: 36px;
            height: 36px;
            font-size: 12px;
            margin-right: 6px;
          }

          nav {
            top: 52px;
            padding: 10px;
          }

          nav a {
            font-size: 12px;
            padding: 6px 12px;
            max-width: 160px;
          }

          .admin-panel {
            padding: 64px 8px 16px;
          }

          h1 {
            font-size: clamp(24px, 5vw, 28px);
          }

          h2 {
            font-size: 20px;
          }

          h3 {
            font-size: 18px;
          }

          .tab-button {
            min-width: 90px;
            font-size: 12px;
            padding: 6px 12px;
            border-radius: 14px;
          }

          .stat-card {
            padding: 12px;
          }

          .stat-card h3 {
            font-size: 14px;
          }

          .stat-card p {
            font-size: 18px;
          }

          .chart-container {
            padding: 12px;
            height: 250px;
          }

          .table-card h4 {
            font-size: 13px;
          }

          .table-card p {
            font-size: 12px;
          }

          select, input, textarea {
            font-size: 12px;
            padding: 6px 8px;
            border-radius: 6px;
          }

          .download-btn, .submit-btn {
            max-width: 160px;
            font-size: 12px;
            padding: 6px 12px;
            border-radius: 14px;
          }

          .gemstone-form, .gallery-form {
            padding: 12px;
          }

          .form-group label {
            font-size: 13px;
          }

          .image-preview img, .gallery-preview img {
            max-width: 70px;
          }

          .gallery-preview video {
            max-width: 100px;
          }
        }

        /* Accessibility Enhancements */
        .tab-button:focus, select:focus, input:focus, textarea:focus, .download-btn:focus, .submit-btn:focus, nav a:focus {
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
            <div
              className={`hamburger ${isNavOpen ? "open" : ""}`}
              onClick={toggleNav}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav>
              <Link to="/#home">HOME</Link>
              <Link to="/#about">ABOUT</Link>
              <Link to="/login">LOGOUT</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="admin-panel">
        <h1>Admin Panel - Jyotish Urja</h1>
        <div className="admin-content">
          <div className="sidebar">
            <div className="tab-buttons">
              <button
                className={`tab-button ${currentTab === "dashboard" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`tab-button ${currentTab === "gemstoneOrders" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("gemstoneOrders")}
              >
                Gemstone Orders
              </button>
              <button
                className={`tab-button ${currentTab === "astroOrders" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("astroOrders")}
              >
                Astrology Solution Orders
              </button>
              <button
                className={`tab-button ${currentTab === "consultancy" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("consultancy")}
              >
                Consultancy Requests
              </button>
              <button
                className={`tab-button ${currentTab === "puja" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("puja")}
              >
                Puja Booking Requests
              </button>
              <button
                className={`tab-button ${currentTab === "gemstone" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("gemstone")}
              >
                Upload Gemstone
              </button>
              <button
                className={`tab-button ${currentTab === "gallery" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("gallery")}
              >
                Gallery
              </button>
            </div>
          </div>
          <div className="main-content">
            {currentTab === "dashboard" && (
              <div ref={dashboardRef}>
                <h2>Dashboard</h2>
                <div className="filter-container">
                  <div className="form-group">
                    <label>Filter Gemstone Orders by Status</label>
                    <select
                      value={gemstoneOrderStatusFilter}
                      onChange={(e) =>
                        setGemstoneOrderStatusFilter(e.target.value)
                      }
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Filter Astro Orders by Status</label>
                    <select
                      value={astroOrderStatusFilter}
                      onChange={(e) =>
                        setAstroOrderStatusFilter(e.target.value)
                      }
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <div className="dashboard-stats">
                  <div className="stat-card">
                    <h3>Pending Gemstone Orders</h3>
                    <p>{pendingGemstoneOrders}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Pending Astro Orders</h3>
                    <p>{pendingAstroOrders}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Pending Consultancies</h3>
                    <p>{pendingConsultancies}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Earnings</h3>
                    <p>${totalEarnings}</p>
                  </div>
                </div>
                <div className="chart-container">
                  <Bar data={earningsData} options={earningsOptions} />
                </div>
                <h3>Gemstone Orders</h3>
                <p>
                  Total Gemstone Orders:{" "}
                  {filteredGemstoneOrdersForDashboard.length}
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Place</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGemstoneOrdersForDashboard.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.item}</td>
                        <td>{order.status}</td>
                        <td>${order.amount}</td>
                        <td>{order.place}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleGemstoneStatusChange(
                                order.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="responsive-table">
                  {filteredGemstoneOrdersForDashboard.map((order) => (
                    <div key={order.id} className="table-card">
                      <h4>Order #{order.id}</h4>
                      <p>
                        <strong>Item:</strong> {order.item}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Amount:</strong> ${order.amount}
                      </p>
                      <p>
                        <strong>Place:</strong> {order.place}
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleGemstoneStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  ))}
                </div>
                <h3>Astrology Solution Orders</h3>
                <p>
                  Total Astro Orders: {filteredAstroOrdersForDashboard.length}
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>DOB</th>
                      <th>Birth Time</th>
                      <th>Birth Place</th>
                      <th>Item</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Place</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAstroOrdersForDashboard.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.email}</td>
                        <td>{order.dob}</td>
                        <td>{order.birthTime}</td>
                        <td>{order.birthPlace}</td>
                        <td>{order.item}</td>
                        <td>{order.status}</td>
                        <td>${order.amount}</td>
                        <td>{order.place}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleAstroStatusChange(order.id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="responsive-table">
                  {filteredAstroOrdersForDashboard.map((order) => (
                    <div key={order.id} className="table-card">
                      <h4>Order #{order.id}</h4>
                      <p>
                        <strong>Name:</strong> {order.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.email}
                      </p>
                      <p>
                        <strong>DOB:</strong> {order.dob}
                      </p>
                      <p>
                        <strong>Birth Time:</strong> {order.birthTime}
                      </p>
                      <p>
                        <strong>Birth Place:</strong> {order.birthPlace}
                      </p>
                      <p>
                        <strong>Item:</strong> {order.item}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Amount:</strong> ${order.amount}
                      </p>
                      <p>
                        <strong>Place:</strong> {order.place}
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleAstroStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  ))}
                </div>
                <button className="download-btn" onClick={downloadPDF}>
                  Download Dashboard as PDF
                </button>
              </div>
            )}

            {currentTab === "gemstoneOrders" && (
              <div>
                <h2>Gemstone Orders</h2>
                <div className="filter-container">
                  <div className="form-group">
                    <label>Filter by Status</label>
                    <select
                      value={gemstoneOrderStatusFilter}
                      onChange={(e) =>
                        setGemstoneOrderStatusFilter(e.target.value)
                      }
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <p>Total Gemstone Orders: {filteredGemstoneOrders.length}</p>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Place</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGemstoneOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.item}</td>
                        <td>{order.status}</td>
                        <td>${order.amount}</td>
                        <td>{order.place}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleGemstoneStatusChange(
                                order.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="responsive-table">
                  {filteredGemstoneOrders.map((order) => (
                    <div key={order.id} className="table-card">
                      <h4>Order #{order.id}</h4>
                      <p>
                        <strong>Item:</strong> {order.item}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Amount:</strong> ${order.amount}
                      </p>
                      <p>
                        <strong>Place:</strong> {order.place}
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleGemstoneStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === "astroOrders" && (
              <div>
                <h2>Astrology Solution Orders</h2>
                <div className="filter-container">
                  <div className="form-group">
                    <label>Filter by Status</label>
                    <select
                      value={astroOrderStatusFilter}
                      onChange={(e) =>
                        setAstroOrderStatusFilter(e.target.value)
                      }
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <p>Total Astro Orders: {filteredAstroOrders.length}</p>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>DOB</th>
                      <th>Birth Time</th>
                      <th>Birth Place</th>
                      <th>Item</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Place</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAstroOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.email}</td>
                        <td>{order.dob}</td>
                        <td>{order.birthTime}</td>
                        <td>{order.birthPlace}</td>
                        <td>{order.item}</td>
                        <td>{order.status}</td>
                        <td>${order.amount}</td>
                        <td>{order.place}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleAstroStatusChange(order.id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="responsive-table">
                  {filteredAstroOrders.map((order) => (
                    <div key={order.id} className="table-card">
                      <h4>Order #{order.id}</h4>
                      <p>
                        <strong>Name:</strong> {order.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.email}
                      </p>
                      <p>
                        <strong>DOB:</strong> {order.dob}
                      </p>
                      <p>
                        <strong>Birth Time:</strong> {order.birthTime}
                      </p>
                      <p>
                        <strong>Birth Place:</strong> {order.birthPlace}
                      </p>
                      <p>
                        <strong>Item:</strong> {order.item}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Amount:</strong> ${order.amount}
                      </p>
                      <p>
                        <strong>Place:</strong> {order.place}
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleAstroStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === "consultancy" && (
              <div>
                <h2>Consultancy Requests</h2>
                <div className="filter-container">
                  <div className="form-group">
                    <label>Filter by Status</label>
                    <select
                      value={consultStatusFilter}
                      onChange={(e) => setConsultStatusFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>DOB</th>
                      <th>Birth Time</th>
                      <th>Birth Place</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConsultancies.map((consult) => (
                      <tr key={consult.id}>
                        <td>{consult.name}</td>
                        <td>{consult.dob}</td>
                        <td>{consult.birthTime}</td>
                        <td>{consult.birthPlace}</td>
                        <td>{consult.type}</td>
                        <td>{consult.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="responsive-table">
                  {filteredConsultancies.map((consult) => (
                    <div key={consult.id} className="table-card">
                      <h4>Request #{consult.id}</h4>
                      <p>
                        <strong>Name:</strong> {consult.name}
                      </p>
                      <p>
                        <strong>DOB:</strong> {consult.dob}
                      </p>
                      <p>
                        <strong>Birth Time:</strong> {consult.birthTime}
                      </p>
                      <p>
                        <strong>Birth Place:</strong> {consult.birthPlace}
                      </p>
                      <p>
                        <strong>Type:</strong> {consult.type}
                      </p>
                      <p>
                        <strong>Status:</strong> {consult.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === "puja" && (
              <div>
                <h2>Puja Booking Requests</h2>
                <div className="filter-container">
                  <div className="form-group">
                    <label>Filter by Status</label>
                    <select
                      value={pujaStatusFilter}
                      onChange={(e) => setPujaStatusFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <p>Total Puja Bookings: {filteredPujaBookings.length}</p>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Puja Name</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPujaBookings.map((puja) => (
                      <tr key={puja.id}>
                        <td>{puja.id}</td>
                        <td>{puja.name}</td>
                        <td>{puja.customer}</td>
                        <td>{puja.date}</td>
                        <td>{puja.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="responsive-table">
                  {filteredPujaBookings.map((puja) => (
                    <div key={puja.id} className="table-card">
                      <h4>Puja #{puja.id}</h4>
                      <p>
                        <strong>Name:</strong> {puja.name}
                      </p>
                      <p>
                        <strong>Customer:</strong> {puja.customer}
                      </p>
                      <p>
                        <strong>Date:</strong> {puja.date}
                      </p>
                      <p>
                        <strong>Status:</strong> {puja.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === "gemstone" && (
              <div className="gemstone-form">
                <h3>Upload Gemstone</h3>
                <form onSubmit={handleGemstoneSubmit}>
                  <div className="form-group">
                    <label>Gemstone Name</label>
                    <input
                      type="text"
                      name="name"
                      value={gemstoneData.name}
                      onChange={handleGemstoneChange}
                      placeholder="Enter gemstone name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Rate ($)</label>
                    <input
                      type="number"
                      name="rate"
                      value={gemstoneData.rate}
                      onChange={handleGemstoneChange}
                      placeholder="Enter rate"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={gemstoneData.description}
                      onChange={handleGemstoneChange}
                      placeholder="Enter description"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload Images (up to 5)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGemstoneImageChange}
                    />
                    {gemstoneData.images.length > 0 && (
                      <div className="image-preview">
                        {gemstoneData.images.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Gemstone ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="submit-btn" type="submit">
                    Upload Gemstone
                  </button>
                </form>
              </div>
            )}

            {currentTab === "gallery" && (
              <div className="gallery-form">
                <h3>Gallery</h3>
                <div className="form-group">
                  <label>Upload Photos</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleGalleryUpload(e, "photos")}
                  />
                  <button
                    className="submit-btn"
                    onClick={() => handleGallerySubmit("photos")}
                    disabled={galleryData.photos.length === 0}
                  >
                    Submit Photos
                  </button>
                </div>
                <div className="form-group">
                  <label>Upload Videos</label>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    multiple
                    onChange={(e) => handleGalleryUpload(e, "videos")}
                  />
                  <button
                    className="submit-btn"
                    onClick={() => handleGallerySubmit("videos")}
                    disabled={galleryData.videos.length === 0}
                  >
                    Submit Videos
                  </button>
                </div>
                {(galleryData.photos.length > 0 ||
                  galleryData.videos.length > 0) && (
                    <div className="gallery-preview">
                      <h4>Preview</h4>
                      <div className="image-preview">
                        {galleryData.photos.map((url, index) => (
                          <img
                            key={`photo-${index}`}
                            src={url}
                            alt={`Gallery Photo ${index + 1}`}
                          />
                        ))}
                        {galleryData.videos.map((url, index) => (
                          <video key={`video-${index}`} controls>
                            <source src={url} type="video/mp4" />
                          </video>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
