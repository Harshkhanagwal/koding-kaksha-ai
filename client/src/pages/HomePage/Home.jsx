import React from "react";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Herosection/Herosection";
import Features from "../../Components/Features/Features";
import CTA from "../../Components/CTA/Cta";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import Stats from "../../Components/Stats/Stats";
import TrustSection from "../../Components/Trust/TrustSection";
import DarkSection from "../../Components/Darksection/DarkSection";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <DarkSection/>
      <Stats/>
      <HowItWorks/>
      <TrustSection/>
      <CTA />
    </>
  );
};

export default Home;