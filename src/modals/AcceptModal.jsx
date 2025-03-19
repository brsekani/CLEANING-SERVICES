import React, { useContext } from "react";
import { AdminContext } from "../context/AuthContext";
import { Modal, Button } from "@mantine/core";

const AcceptModal = () => {
  const { isAcceptModalOpen, closeModals, selectedItem } =
    useContext(AdminContext);

  return (
    <Modal
      opened={isAcceptModalOpen}
      onClose={closeModals}
      title="Accept Booking"
    >
      {selectedItem && (
        <div>
          <p className="text-lg">
            Are you sure you want to accept the booking for{" "}
            <strong>{selectedItem.name}</strong>?
          </p>
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="border border-gray-400 text-gray-700 px-4 py-2 hover:bg-gray-200 transition rounded-full"
              onClick={closeModals}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-full text-white transition"
              style={{ backgroundColor: "#3FA34D" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#368B40")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3FA34D")
              }
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AcceptModal;
