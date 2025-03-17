import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Reviews from "./pages/Review";
import Booking from "./pages/Booking";
import TrackingPage from "./pages/Tracking";
import AdminLogin from "./pages/admin/AdminLogin";
import Layout from "./components/Layout"; // Public Layout
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AllBooking from "./pages/admin/AllBooking";
import PendingBooking from "./pages/admin/PendingBooking";
import CompleteBooking from "./pages/admin/CompleteBooking";
import CanceledBooking from "./pages/admin/CanceledBooking";
import BookingDetails from "./pages/admin/BookingDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ✅ Public Layout
    children: [
      { index: true, element: <Home /> }, // ✅ Default route for "/"
      { path: "reviews", element: <Reviews /> },
      { path: "booking", element: <Booking /> },
      { path: "tracking", element: <TrackingPage /> },
      { path: "admin-login", element: <AdminLogin /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // ✅ Admin Layout Wrapper
    children: [
      { path: "dashboard", element: <Dashboard /> }, // ✅ Correct "/admin/dashboard" path
      { path: "bookings/all", element: <AllBooking /> }, // ✅ Correct "/admin/dashboard" path
      { path: "bookings/pending", element: <PendingBooking /> }, // ✅ Correct "/admin/dashboard" path
      { path: "bookings/Processed", element: <CompleteBooking /> }, // ✅ Correct "/admin/dashboard" path
      { path: "bookings/canceled", element: <CanceledBooking /> }, // ✅ Correct "/admin/dashboard" path
      { path: "/admin/booking/:id", element: <BookingDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
