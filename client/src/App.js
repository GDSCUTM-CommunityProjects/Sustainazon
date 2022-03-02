import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Navbar/Header";
import SignupPage from "./pages/SignupPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import Footer from "./components/Navbar/Footer";
import { FeaturedPage } from "./pages/FeaturedPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LandingPage />}></Route>
          <Route
            path={"/search"}
            element={
              <>
                <Header />
                <SearchResultsPage />
                <Footer />
              </>
            }
          ></Route>
          <Route path={"/featured"} element={<FeaturedPage />}></Route>
          <Route path={"/signup"} element={<SignupPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
