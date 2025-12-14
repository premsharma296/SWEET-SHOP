import React from "react";

export default function SweetCard({ sweet, onPurchase }) {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="container">
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>

      <button
        disabled={isOutOfStock}
        onClick={() => onPurchase(sweet.id)}
        style={{
          backgroundColor: isOutOfStock ? "#aaa" : "#6c5ce7",
          cursor: isOutOfStock ? "not-allowed" : "pointer"
        }}
      >
        {isOutOfStock ? "Out of Stock" : "Purchase"}
      </button>
    </div>
  );
}
