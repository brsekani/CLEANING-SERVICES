import React, { createContext, useState } from "react";

// Create Context
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Modal states
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Open modals
  const openRejectModal = (item) => {
    setSelectedItem(item);
    setIsRejectModalOpen(true);
  };

  const openAcceptModal = (item) => {
    setSelectedItem(item);
    setIsAcceptModalOpen(true);
  };
  // Close all modals
  const closeModals = () => {
    setIsRejectModalOpen(false);
    setIsAcceptModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <AdminContext.Provider
      value={{
        isRejectModalOpen,
        isAcceptModalOpen,
        selectedItem,
        openRejectModal,
        openAcceptModal,
        closeModals,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
