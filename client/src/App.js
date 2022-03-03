import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Navbar/Header";
import SignupPage from "./pages/SignupPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import Footer from "./components/Navbar/Footer";
import { FeaturedPage } from "./pages/FeaturedPage";
import { Flex } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      <Flex minH={"100vh"} direction={"column"}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<LandingPage />}></Route>
            <Route path={"/search"} element={<SearchResultsPage />}></Route>
            <Route path={"/featured"} element={<FeaturedPage />}></Route>
            <Route path={"/signup"} element={<SignupPage />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Flex>
    </>
  );
};
export default App;
