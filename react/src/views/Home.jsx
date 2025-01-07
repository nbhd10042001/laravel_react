import React from "react";
import FeatureSection from "../components/sections/FeatureSection";
import HeaderSection from "../components/sections/HeaderSection";
import BentoGrid from "../components/sections/BentoGrid";
import HeroSection from "../components/sections/HeroSection";
import Testimonial from "../components/sections/Testimonial";
import DialogComponent from "../components/DialogComponent";
import PromoSection from "../components/sections/PromoSection";

export default function Home() {
  return (
    <>
      <PromoSection></PromoSection>
      <HeroSection></HeroSection>
      <FeatureSection></FeatureSection>
      <HeaderSection></HeaderSection>
      <BentoGrid></BentoGrid>
      <Testimonial></Testimonial>
      <DialogComponent></DialogComponent>
    </>
  );
}
