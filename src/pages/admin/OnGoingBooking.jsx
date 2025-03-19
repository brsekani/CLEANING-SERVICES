import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BookingTable from "../../components/BookingTable";
import { getBookings } from "../../api/bookingService";

const ITEMS_PER_PAGE = 10;

const OnGoingBooking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const Bookings = await getBookings("On-Going");
        setBookings(
          Bookings.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        );
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ✅ **Search functionality**
  const filteredBookings = searchQuery.trim()
    ? bookings.filter((booking) =>
        ["fullName", "email", "service"].some((key) =>
          booking[key]?.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
      )
    : bookings;

  // ✅ **Pagination setup**
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-[#0E355D] mb-6">
        On-going Bookings
      </h1>
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search Completed bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0E355D]"
          />
          <FaSearch className="absolute top-4 left-3 text-gray-400" />
        </div>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <BookingTable bookings={paginatedBookings} />
          {filteredBookings.length > ITEMS_PER_PAGE && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-[#092742] rounded-full ${
                  currentPage === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FFDB63] hover:bg-[#092742] hover:text-[#FFDB63]"
                }`}
              >
                Previous
              </button>
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-[#092742] rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FFDB63] hover:bg-[#092742] hover:text-[#FFDB63]"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OnGoingBooking;
