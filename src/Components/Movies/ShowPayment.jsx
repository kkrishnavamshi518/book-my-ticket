import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function ShowPayment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  if (!state || !state.movie) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        No Movie Found
      </div>
    );
  }
  const { movie, selectedSeats = [], totalPrice = 0, time } = state;
  const feePerSeat = 30;
  const convenienceFee = feePerSeat * selectedSeats.length;
  const finalAmount = totalPrice + convenienceFee;
  const paymentMethods = [
    { id: "UPI", label: "UPI", icon: <i className="bi bi-qr-code-scan text-2xl"></i> },
    { id: "NetBanking", label: "Net Banking", icon: <i className="bi bi-bank text-2xl"></i> },
    { id: "CreditCard", label: "Credit/Debit Card", icon: <i className="bi bi-credit-card-fill text-2xl"></i> },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h2 className="text-center text-2xl font-bold text-gray-800">🎬 Movie Payment</h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Movie :</span>
            <span className="font-semibold text-gray-800">{movie.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Time :</span>
            <span className="font-semibold text-gray-800">{time}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="font-medium text-gray-600">Seats :</span>
            <span className="flex flex-wrap gap-2 justify-end">
              {selectedSeats.map((s) => (
                <span key={s.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {s.id}
                </span>
              ))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Subtotal :</span>
            <span className="font-semibold text-gray-800">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Convenience Fee :</span>
            <span className="font-semibold text-gray-800">₹{feePerSeat} × {selectedSeats.length} = ₹{convenienceFee}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2 text-lg font-bold text-gray-800">
            <span>Total :</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold mb-2">Select Payment Method</h3>
          <div className="flex flex-col gap-3">
            {paymentMethods.map((method) => (
              <div key={method.id} onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                  selectedMethod === method.id ? "bg-green-50 border-green-400 shadow-md" : "hover:bg-gray-100"
                }`}>
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
        <button onClick={() => navigate("/movie-payment-success", 
                                { state: { ...state, finalAmount, paymentMethod: selectedMethod } })}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold 
                           py-3 rounded-xl shadow-md transition mt-4 cursor-pointer">
          Pay ₹{finalAmount}
        </button>
      </div>
    </div>
  );
}