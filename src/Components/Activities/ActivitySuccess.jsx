import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function ActivitySuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state || !state.activity) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        No Activity Found
      </div>
    );
  }
  const { activity, quantity, totalPrice } = state;
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="text-green-500 text-6xl">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">Booking Confirmed!</h1>
          <p className="text-gray-600 text-center">Your tickets for 
            <span className="font-semibold">{activity.title}</span> have been booked.</p>
        </div>
        {activity.img && (
          <div className="flex justify-center">
            <img src={activity.img} alt={activity.title} 
                 className="w-40 h-60 object-cover rounded-lg shadow-md"/>
          </div>
        )}
        <div className="bg-gray-50 rounded-lg shadow-inner p-4 space-y-2 text-center">
          <div className="text-lg font-semibold text-gray-800">{activity.title}</div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm shadow-sm">
              {quantity} Ticket{quantity > 1 ? "s" : ""}
            </span>
          </div>
          <div className="mt-3 text-xl font-bold text-gray-900">
            Total Paid : ₹{totalPrice}
          </div>
        </div>
        <button onClick={() => navigate("/")}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white 
                     font-bold rounded-xl shadow-lg transition cursor-pointer">
          Back to Home
        </button>
      </div>
    </div>
  );
}