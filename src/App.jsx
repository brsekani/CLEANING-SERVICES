import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Reviews from "./pages/Review";
import Booking from "./pages/Booking";
import TrackingPage from "./pages/Tracking";
import AdminLogin from "./pages/admin/AdminLogin";
import Layout from "./components/Layout"; // Public Layout
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AllBooking from "./pages/admin/AllBooking";
import PendingBooking from "./pages/admin/PendingBooking";
import CompleteBooking from "./pages/admin/CompleteBooking";
import CanceledBooking from "./pages/admin/CanceledBooking";
import OnGoingBooking from "./pages/admin/OnGoingBooking";
import BookingDetails from "./pages/admin/BookingDetails";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { AuthProvider } from "./context/AuthContext";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import PublicRoute from "./components/PublicRoute.JSX";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ✅ Public Layout
    children: [
      { index: true, element: <Home /> },
      { path: "reviews", element: <Reviews /> },
      { path: "booking", element: <Booking /> },
      { path: "tracking", element: <TrackingPage /> },
      {
        path: "admin-login",
        element: <PublicRoute />, // ✅ Prevent logged-in users from accessing login page
        children: [{ index: true, element: <AdminLogin /> }],
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />, // ✅ Protect all admin routes
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "bookings/all", element: <AllBooking /> },
          { path: "bookings/onGoing", element: <OnGoingBooking /> },
          { path: "bookings/pending", element: <PendingBooking /> },
          { path: "bookings/Completed", element: <CompleteBooking /> },
          { path: "bookings/canceled", element: <CanceledBooking /> },
          { path: "booking/:id", element: <BookingDetails /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
