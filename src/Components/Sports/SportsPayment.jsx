import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function SportsPayment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  if (!state || !state.event) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        No booking data found
      </div>
    );
  }
  const { event, quantity, totalPrice } = state;
  const paymentMethods = [
    { id: "UPI", label: "UPI", icon: <i className="bi bi-qr-code-scan text-2xl"></i>},
    { id: "NetBanking", label: "Net Banking", icon: <i className="bi bi-bank text-2xl"></i>},
    { id: "CreditCard", label: "Credit/Debit Card", icon: <i className="bi bi-credit-card-fill text-2xl"></i>},
  ];
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎟️</span>
            <h2 className="text-xl font-bold text-gray-800 text-center">Payment</h2>
          </div>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Event</span>
              <span className="font-semibold text-gray-800">{event.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Tickets</span>
              <span className="font-semibold text-gray-800">{quantity}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2 text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-gray-700 font-semibold mb-2">Select Payment Method</h3>
            <div className="flex flex-col gap-3">
              {paymentMethods.map((method) => (
                <div key={method.id} onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                    selectedMethod === method.id ? "bg-green-50 border-green-400 shadow-md" : "hover:bg-gray-100" }`}>
                  <div className="flex items-center gap-3 text-gray-800">{method.icon}
                    <span className="font-medium">{method.label}</span>
                  </div>
                  {selectedMethod === method.id && (
                    <span className="text-green-600 font-bold">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t">
          <button onClick={() => navigate("/sports-payment-success", 
                                  { state: { ...state, paymentMethod: selectedMethod },})} 
            className="w-full py-3 rounded-full text-white font-semibold text-lg shadow-lg 
                       transform transition-all duration-300 bg-linear-to-r from-green-500 
                       via-green-600 to-green-700 hover:scale-105 hover:shadow-2xl cursor-pointer">
            Pay Now</button>
        </div>
      </div>
    </div>
  );
}