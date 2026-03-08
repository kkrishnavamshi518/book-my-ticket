import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function ActivityPayment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  if (!state || !state.activity) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        No booking data found
      </div>
    );
  }
  const { activity, quantity, totalPrice } = state;
  const paymentMethods = [
    { id: "UPI", label: "UPI", icon: <i className="bi bi-qr-code-scan text-2xl"></i> },
    { id: "NetBanking", label: "Net Banking", icon: <i className="bi bi-bank text-2xl"></i> },
    { id: "CreditCard", label: "Credit/Debit Card", icon: <i className="bi bi-credit-card-fill text-2xl"></i> },
  ];
  const handlePayment = () => {
    navigate("/activity-success", {
      state: { activity, quantity, totalPrice, paymentMethod: selectedMethod },
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
        <div className="p-6 flex flex-col items-center gap-3">
          <span className="text-3xl">🎫</span>
          <h2 className="text-2xl font-bold text-gray-800 text-center">Payment</h2>
          <p className="text-gray-600 text-center">
            Confirm your booking for <span className="font-semibold">{activity.title}</span>
          </p>
        </div>
        <div className="bg-gray-50 p-4 mx-6 rounded-xl space-y-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Activity</span>
            <span className="font-semibold text-gray-800">{activity.title}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Tickets</span>
            <span className="font-semibold text-gray-800">{quantity}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-red-500 border-t pt-2 mt-2">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
        <div className="mt-4 p-4">
          <h3 className="text-gray-700 font-semibold mb-2">Select Payment Method</h3>
          <div className="flex flex-col gap-3">
            {paymentMethods.map((method) => (
              <div key={method.id} onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                  selectedMethod === method.id ? "bg-green-50 border-green-400 shadow-md" : "hover:bg-gray-100"}`}>
                <div className="flex items-center gap-3 text-gray-800">
                  {method.icon}
                  <span className="font-medium">{method.label}</span>
                </div>
                {selectedMethod === method.id && (
                  <span className="text-green-600 font-bold">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t">
          <button onClick={handlePayment}
            className="w-full py-3 rounded-full text-white font-semibold text-lg shadow-lg 
                       transform transition-all duration-300 bg-linear-to-r from-green-500 
                       via-green-600 to-green-700 hover:scale-105 hover:shadow-2xl cursor-pointer">
            Pay ₹ {totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
}