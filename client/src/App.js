import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Navbar/Header";
import SignupPage from "./pages/SignupPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import Footer from "./components/Navbar/Footer";

const App = () => {
  return (
    <>
      <Header />
      <SearchResultsPage />
      <Footer />
    </>
  );
};
export default App;
