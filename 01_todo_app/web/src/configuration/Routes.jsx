import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ACCOUNT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
} from "./paths";
import ScrollToTop from "./ScrollToTop";
import Landing from "../components/landing";

const appRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
          <Route exact path={HOME_PAGE} element={<Landing/>} />
      </Routes>
    </Router>
  );
};

export default appRoutes;
