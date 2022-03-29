import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import Footer from "./components/Navbar/Footer";
import { FeaturedPage } from "./pages/FeaturedPage";
import { Flex } from "@chakra-ui/react";
import { Navbar2 } from "./components/Navbar2";
import { Sidebar } from "./components/Sidebar";
import RegisterBusinessPage from "./pages/RegisterBusinessPage";
import RegisterProductPage from "./pages/RegisterProductPage";
import LoginPage from "./pages/LoginPage";
import { AboutPage } from "./pages/AboutPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import { instance } from "./axios";
import { AccountsPage } from "./pages/AccountsPage";
import { BusinessItemsPage } from "./pages/BusinessItemsPage";
import Cookies from "universal-cookie";
import { OrderedItemsPage } from "./pages/OrderedItemsPage";

const App = () => {
  const cookies = new Cookies();
  const isSeller = cookies.get("isSeller") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.get("auth") === "true");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        await instance
          .get("/accounts/manage")
          .then((response) => {
            setUserName(response.data.name);
          })
          .catch((e) => {
            console.log("Unable to fetch user data");
            setIsLoggedIn(false);
          });
      }
    };
    fetchUserData();
  }, [isLoggedIn]);

  return (
    <>
      <Flex minH={"100vh"} direction={"column"}>
        <BrowserRouter>
          <Routes>
            {isLoggedIn && (
              <Route
                path={"/account"}
                element={
                  <>
                    <Navbar2 user={userName} />
                    <Flex grow={1}>
                      <Sidebar />
                      <AccountsPage />
                    </Flex>
                    <Footer />
                  </>
                }
              ></Route>
            )}
            <Route
              path={"/"}
              element={
                <>
                  <Navbar2 user={userName === "" ? "Guest" : userName} />
                  <Flex grow={1}>
                    <LandingPage />
                  </Flex>
                  <Footer />
                </>
              }
            ></Route>
            <Route
              path={"/search"}
              element={
                <>
                  <Navbar2 user={userName === "" ? "Guest" : userName} />
                  <Flex grow={1}>
                    <Sidebar />
                    <SearchResultsPage />
                  </Flex>
                  <Footer />
                </>
              }
            ></Route>

            <Route path={"/login"} element={<LoginPage />}></Route>

            <Route
              path={"/featured"}
              element={
                <>
                  <Navbar2 user={userName === "" ? "Guest" : userName} />
                  <Flex grow={1}>
                    <Sidebar />
                    <FeaturedPage />
                  </Flex>
                  <Footer />
                </>
              }
            ></Route>
            {!isLoggedIn && (
              <Route path={"/signup"} element={<SignupPage />}></Route>
            )}
            {!isLoggedIn && (
              <Route
                path={"/registerbusiness"}
                element={<RegisterBusinessPage />}
              ></Route>
            )}
            {isSeller && (
              <Route
                path={"/registerproduct"}
                element={<RegisterProductPage />}
              ></Route>
            )}
            {isSeller && (
              <Route
                path={"/itemsOrdered"}
                element={
                  <>
                    <Navbar2 user={userName} />
                    <Flex grow={1}>
                      <Sidebar />
                      <OrderedItemsPage />
                    </Flex>
                    <Footer />
                  </>
                }
              ></Route>
            )}
            <Route
              path={"/about"}
              element={
                <>
                  <Navbar2 user={userName} />
                  <Flex grow={1}>
                    <Sidebar />
                    <AboutPage />
                  </Flex>
                  <Footer />
                </>
              }
            ></Route>
            {!isSeller && (
              <Route
                path={"/cart"}
                element={
                  <>
                    <Navbar2 user={userName === "" ? "Guest" : userName} />
                    <Flex grow={1}>
                      <Sidebar />
                      <ShoppingCartPage />
                    </Flex>
                    <Footer />
                  </>
                }
              ></Route>
            )}
            {isSeller && (
              <Route
                path={"/itemsSelling"}
                element={
                  <>
                    <Navbar2 user={userName} />
                    <Flex grow={1}>
                      <Sidebar />
                      <BusinessItemsPage />
                    </Flex>
                    <Footer />
                  </>
                }
              ></Route>
            )}
          </Routes>
        </BrowserRouter>
      </Flex>
    </>
  );
};
export default App;
