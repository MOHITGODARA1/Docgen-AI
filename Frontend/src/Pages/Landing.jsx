import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Trusted from "../components/layout/Trusted";
import Features from "../components/layout/Features";
import HowItWorks from "../components/layout/HowItWorks";
import CTA from "../components/layout/CTA";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { user, logout } = useAuth();
  
  useEffect(() => {
    // If the user navigates back to the landing page, expire their session.
    if (user) {
      logout();
    }
  }, [user]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prev = {
      htmlBg: html.style.backgroundColor,
      bodyBg: body.style.backgroundColor,
      bodyOverflowX: body.style.overflowX,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.style.backgroundColor = "#0B0F19";
    body.style.backgroundColor = "#0B0F19";
    body.style.overflowX = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.backgroundColor = prev.htmlBg;
      body.style.backgroundColor = prev.bodyBg;
      body.style.overflowX = prev.bodyOverflowX;
      html.style.overscrollBehavior = prev.htmlOverscroll;
      body.style.overscrollBehavior = prev.bodyOverscroll;
    };
  }, []);

  return (
    <div className="bg-[#0B0F19] min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;