import React from "react";

import Banner from "../components/LandingPage/Banner";
import FourColumns from "../components/LandingPage/Features";
import FeatureCards from "../components/LandingPage/FeatureCards";
import LandingLayout from "../components/LandingPage/LandingLayout";

export default function LandingPage() {
  return (
    <LandingLayout>
      <Banner />
      <FeatureCards />
      <FourColumns />
    </LandingLayout>
  );
}
