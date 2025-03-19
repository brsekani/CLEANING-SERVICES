import React, { useContext } from "react";
import { AdminContext } from "../context/AuthContext";
import { Modal } from "@mantine/core";

const RejectModal = () => {
  const { isRejectModalOpen, closeModals, selectedItem } =
    useContext(AdminContext);

  return (
    <Modal
      opened={isRejectModalOpen}
      onClose={closeModals}
      title="Reject Booking"
    >
      {selectedItem && (
        <div>
          <p className="text-lg">
            Are you sure you want to reject the booking for{" "}
            <strong>{selectedItem.name}</strong>?
          </p>
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="border border-gray-400 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition"
              onClick={closeModals}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-full text-white transition"
              style={{ backgroundColor: "#D64550" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#B53D45")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#D64550")
              }
              onClick={() => {
                console.log("Booking Rejected:", selectedItem);
                closeModals();
              }}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RejectModal;
