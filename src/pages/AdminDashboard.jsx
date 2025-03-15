import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome, Admin</h1>
      <p className="text-gray-600 mt-2">This is your dashboard.</p>
      <button
        // onClick={logout}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
