import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Hero from "../../Components/Herosection/Herosection";
import Features from "../../Components/Features/Features";
import CTA from "../../Components/CTA/Cta";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import Stats from "../../Components/Stats/Stats";
import TrustSection from "../../Components/Trust/TrustSection";
import DarkSection from "../../Components/Darksection/DarkSection";
import ProjectOverview from "../../Components/ProjectOverview/ProjectOverview";
import LearningSystem from "../../Components/LearningSystem/LearningSystem";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <DarkSection/>
      <ProjectOverview/>
      <Stats/>
      <HowItWorks/>
      <TrustSection/>
      <LearningSystem/>
      <CTA />
      <Footer/>
    </>
  );
};

export default Home;
