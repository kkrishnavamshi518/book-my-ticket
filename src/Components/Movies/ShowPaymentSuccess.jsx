import { useLocation, useNavigate } from "react-router-dom";
export default function ShowPaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state || !state.movie) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">No Movie Found</div>
    );
  }
  const { movie, selectedSeats = [], finalAmount } = state;
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="text-green-500 text-6xl">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">Booking Confirmed!</h1>
          <p className="text-gray-600 text-center">Your movie tickets have been successfully booked.</p>
        </div>
        {movie.img && (
          <div className="flex justify-center">
            <img src={movie.img} alt={movie.title} className="w-40 h-60 object-cover rounded-lg shadow-md"/>
          </div>
        )}
        <div className="bg-gray-50 rounded-lg shadow-inner p-4 space-y-3">
          <div className="text-lg font-semibold text-gray-800 text-center">{movie.title}</div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {selectedSeats.map((s) => (
              <span key={s.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm shadow-sm">{s.id}</span>
            ))}
          </div>
          <div className="mt-3 text-center text-xl font-bold text-gray-900">Total Paid : ₹{finalAmount}</div>
        </div>
        <button onClick={() => navigate("/")} 
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white 
                          font-bold rounded-xl shadow-lg transition cursor-pointer">Back to Home</button>
      </div>
    </div>
  );
}