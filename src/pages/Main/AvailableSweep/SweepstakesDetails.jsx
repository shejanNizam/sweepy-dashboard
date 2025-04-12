import { Divider } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get ID from URL

const sweepstakesData = [
  {
    id: "1",
    productName: "T-shirt 95",
    category: "Cloths",
    boostPrice: "$30",
    deadline: "2025-03-23",
    winnerReveal: "Within the next 14 to 30 days",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    availableColors: ["White", "Black", "Red", "Blue"],
    winner: 1,
    brand: "Nike",
    description: `A T-shirt is a casual, lightweight garment typically made from soft cotton or cotton-blend fabric. It has short sleeves, a round neckline, and no collar, offering comfort and ease of movement. T-shirts are popular for everyday wear and come in a wide range of styles, from basic solid colors to graphic prints, logos, or patterns. They are versatile, easy to layer, and can be dressed up or down depending on the occasion.`,
    image: "https://via.placeholder.com/400x400?text=T-shirt+95", // Placeholder image
  },
];

export default function SweepstakesDetails() {
  const { id } = useParams(); // Get the ID of the selected sweepstake from the URL
  const [sweepstake, setSweepstake] = useState(null);

  useEffect(() => {
    const selectedSweepstake = sweepstakesData.find((item) => item.id === id);
    setSweepstake(selectedSweepstake);
  }, [id]);

  if (!sweepstake) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Sweepstakes Details
      </h2>

      <div className="flex gap-10">
        {/* Product Image */}
        <div className="flex-shrink-0 w-1/3">
          <img
            src={sweepstake.image}
            alt={sweepstake.productName}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              {sweepstake.productName}
            </h3>
            <p className="text-gray-500">Category: {sweepstake.category}</p>
          </div>

          <Divider />

          <div className="space-y-3">
            <p>
              <strong>Boost Price:</strong> {sweepstake.boostPrice}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {dayjs(sweepstake.deadline).format("MMMM D, YYYY")}
            </p>
            <p>
              <strong>Winner Reveal:</strong> {sweepstake.winnerReveal}
            </p>
            <p>
              <strong>Winner (Person):</strong> {sweepstake.winner}
            </p>
          </div>

          <Divider />

          <div className="space-y-3">
            <p>
              <strong>Available Sizes:</strong>{" "}
              {sweepstake.availableSizes.join(", ")}
            </p>
            <p>
              <strong>Available Colors:</strong>{" "}
              {sweepstake.availableColors.join(", ")}
            </p>
          </div>

          <Divider />

          {/* Product Description */}
          <div className="space-y-3">
            <p>
              <strong>Brand:</strong> {sweepstake.brand}
            </p>
            <p>
              <strong>Description:</strong>
            </p>
            <p>{sweepstake.description}</p>
          </div>

          <Divider />
        </div>
      </div>
    </div>
  );
}
