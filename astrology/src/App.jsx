import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./login";

import Signup from "./signup";
import ForgotPassword from "./forgotpassword";
import Homes from "./home";
import AstrologyHomePage from "./afterlogin";
import Profile from "./completeprofile";
import FAQ from "./faq";
import VoiceCall from "./voicecall";
import VideoCall from "./vedio";
import OfflineConsultation from "./offline";
import Gemstone from "./gemstone";
import AdminPanel from "./admin";
import PujaBooking from "./pujabooking";
import AstroSolutions from "./kundali";




const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<AstrologyHomePage />} />
      <Route path="//admin-panel" element={<AdminPanel />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/voicecall" element={<VoiceCall />} />
      <Route path="/videocall" element={<VideoCall />} />
      <Route path="/offlinecall" element={<OfflineConsultation />} />
      <Route path="/gemstone" element={<Gemstone />} />
      <Route path="/puja" element={<PujaBooking />} />
      <Route path="/astro-remedies" element={<AstroSolutions />} />
    </Routes>
  );
};

export default App;
