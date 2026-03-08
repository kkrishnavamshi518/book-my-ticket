import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../Sports/Sports";
export default function SportsBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  if (!event) {
    return <div className="p-10 text-center">Event Not Found</div>;
  }
  const totalPrice = event.price * quantity;
  const handleContinue = () => {
    navigate("/sports-payment", {
      state: { event, quantity, totalPrice }
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow grid md:grid-cols-2 gap-8">
        <img src={event.img} alt={event.title} className="w-full max-h-96 object-contain"/>
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p>{event.venue}</p>
          <p>{event.date}</p>
          <div className="flex items-center gap-5">
            <button onClick={() => setQuantity(q => Math.max(1, q-1))} 
                    className="border px-4 py-2 rounded cursor-pointer">−</button>
            <span className="text-xl font-bold">{quantity}</span>
            <button onClick={() => setQuantity(q => q+1)} 
                    className="border px-4 py-2 rounded cursor-pointer">+</button>
          </div>
          <p className="text-xl font-bold text-red-500">₹ {totalPrice}</p>
          <button onClick={handleContinue} 
                  className="bg-red-500 text-white px-6 py-3 rounded-xl w-full cursor-pointer">Continue to Payment</button>
        </div>
      </div>
    </div>
  );
}