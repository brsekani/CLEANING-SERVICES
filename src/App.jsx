import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reviews from "./pages/Review";
import Booking from "./pages/Booking";
import TrackingPage from "./pages/Tracking";
import AdminLogin from "./pages/AdminLogin";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import AdminDashboard from "./pages/AdminDashboard";

function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin"; // Checks if current page is admin

  return (
    <div className="flex flex-col min-h-screen font-montserrat w-full h-full">
      {!isAdminPage && <Header />}
      <main className="flex-1 flex items-center justify-center w-full h-full">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Tracking" element={<TrackingPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
