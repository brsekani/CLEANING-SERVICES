import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex items-center justify-center gap-2 h-20">
      {[1, 2, 3, 4, 5].map((star) => {
        const size = hover === star ? 50 : 32; // Increase size on hover

        return (
          <FaStar
            key={star}
            className={`cursor-pointer transition-transform duration-200 ease-in-out ${
              star <= (hover || rating) ? "text-[#FFDA6C]" : "text-gray-300"
            }`}
            size={size}
            style={{
              transform: hover === star ? "scale(1.5)" : "scale(1)",
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
