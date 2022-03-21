import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import Footer from "./components/Navbar/Footer";
import { FeaturedPage } from "./pages/FeaturedPage";
import { Flex, Spacer } from "@chakra-ui/react";
import { Navbar2 } from "./components/Navbar2";
import { Sidebar } from "./components/Sidebar";
import RegisterBusinessPage from "./pages/RegisterBusinessPage";
import RegisterProductPage from "./pages/RegisterProductPage";

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
                  <Flex grow={1}>
                    <Sidebar />
                    <SearchResultsPage />
                  </Flex>
                  <Footer />
                </>
              }
            ></Route>
            <Route
              path={"/featured"}
              element={
                <>
                  <Navbar2 user={userName} />
                  <Flex grow={1}>
                    <Sidebar />
                    <FeaturedPage />
                  </Flex>
                  <Footer />
                </>
              }
            ></Route>
            <Route path={"/signup"} element={<SignupPage />}></Route>
            <Route
              path={"/registerbusiness"}
              element={<RegisterBusinessPage />}
            ></Route>
            <Route
              path={"/registerproduct"}
              element={<RegisterProductPage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Flex>
    </>
  );
};
export default App;
