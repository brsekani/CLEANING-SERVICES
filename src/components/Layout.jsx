import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen font-montserrat w-full h-full">
      {!isAdminPage && <Header />}
      <main className="flex-1 flex items-center justify-center w-full h-full">
        <Outlet /> {/* ✅ Render child routes */}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default Layout;
