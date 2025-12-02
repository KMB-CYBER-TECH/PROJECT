import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../Component/Navbar";
import Hero from "../Component/Hero";
import Footer from "../Component/Footer";

const RootLayout = () => {
  const location = useLocation();

  const showHero = location.pathname === "/" || location.pathname === "/hero";

  const showFooter = location.pathname === "/" || location.pathname === "/hero";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {showHero && <Hero />}

      <main className="flex-grow">
        <Outlet />
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default RootLayout;
