import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Navbar/Header";
import SignupPage from "./pages/SignupPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import Footer from "./components/Navbar/Footer";
import { FeaturedPage } from "./pages/FeaturedPage";
import { Flex } from "@chakra-ui/react";
import { Navbar2 } from "./components/Navbar2";

const App = () => {
  const userName = "Chris";

  return (
    <>
      <Flex minH={"100vh"} direction={"column"}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<LandingPage />}></Route>
            <Route
              path={"/search"}
              element={
                <>
                  <Navbar2 user={userName} />
                  <SearchResultsPage />
                  <Footer />
                </>
              }
            ></Route>
            <Route path={"/featured"} element={<FeaturedPage />}></Route>
            <Route path={"/signup"} element={<SignupPage />}></Route>
          </Routes>
        </BrowserRouter>
      </Flex>
    </>
  );
};
export default App;
