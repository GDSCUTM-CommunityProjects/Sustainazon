import React from "react";

import Banner from "../components/LandingPage/Banner";
import FourColumns from "../components/LandingPage/Features";
import LandingLayout from "../components/LandingPage/LandingLayout";

export default function LandingPage() {
  return (
    <LandingLayout>
      <Banner />
      <FourColumns />
    </LandingLayout>
  );
}
