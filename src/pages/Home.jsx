import React from "react";
import FooterSection from "../components/Home-page/FooterSection";
import CallToSection from "../components/Home-page/CallToSection";
import AboutUs from "../components/Home-page/AboutUs";
import FeaturesSection from "../components/Home-page/FeaturesSection";
import HeroSection from "../components/Home-page/HeroSection";
import Joinus from "../components/Home-page/Joinus";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AboutUs />
      <Joinus />
      <CallToSection />
      <FooterSection />
    </div>
  );
};

export default Home;
