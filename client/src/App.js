import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Navbar/Header";
import SignupPage from "./pages/SignupPage";

function App() {
  return <SignupPage />;
  // return <LandingPage/ >;
  //   return (
  //   <Router>
  //     <Routes>
  //       <Route path="/">
  //         <LandingPage />
  //       </Route>
  //     </Routes>
  //   </Router>
  // );
}

export default App;
