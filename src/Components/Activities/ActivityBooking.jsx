import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { activitiesData } from "../Activities/Activities";
export default function ActivityBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activitiesData.find((a) => a.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Activity Not Found
      </div>
    );
  }
  const totalPrice = activity.price * quantity;
  const handleContinue = () => {
    navigate("/activity-payment", {
      state: { activity, quantity, totalPrice }
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <button onClick={() => navigate(-1)} 
                className="mb-6 px-4 py-2 border rounded-full hover:bg-red-50 cursor-pointer"> 
                <i className="bi bi-arrow-left m-2"></i>
                Back
        </button>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex items-center justify-center bg-gray-50 p-6 rounded-2xl">
            <img src={activity.img} alt={activity.title} className="max-h-105 object-contain" />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{activity.title}</h2>
              <p className="text-gray-500">{activity.venue}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Select Tickets</h3>
              <div className="flex items-center gap-6">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} 
                        className="w-10 h-10 border rounded-full cursor-pointer" >−</button>
                <span className="text-xl font-bold">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} 
                        className="w-10 h-10 border rounded-full cursor-pointer">+</button>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-xl font-bold text-red-500">₹ {totalPrice}</span>
              </div>
            </div>
            <button onClick={handleContinue} 
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 
                              rounded-xl font-semibold cursor-pointer">
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}