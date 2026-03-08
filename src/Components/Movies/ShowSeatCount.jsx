import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { orgmovies } from "./MovieData";
const PRICE_RECLINER = 350;
const PRICE_CLASSIC = 200;
const SeatBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const movie = orgmovies.find((m) => m.id === Number(id));
  if (!movie) return <div>Movie not found</div>;
  const time = params.get("time") || "7:00 PM";
  const selectedLang = params.get("lang") || movie.lang;
  const selectedFormat = params.get("format") || "2D";
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const classicRows = ["Q","P","N","M","L","K","J","H","G","F","E","D","C","B","A"];
  useEffect(() => {
    if (selectedSeats.length > ticketCount) {
      setSelectedSeats(selectedSeats.slice(0, ticketCount));
    }
  }, [ticketCount]);
  const handleSeatClick = (seat) => {
    const exists = selectedSeats.find(s => s.id === seat.id);
    if (exists) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length < ticketCount) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert(`You can only select ${ticketCount} seats`);
      }
    }
  };
  const generateSeats = (row, start, end, type) => {
    let seats = [];
    for (let i = start; i <= end; i++) {
      seats.push({
        id: `${row}${i}`,
        number: i,
        type,
        price: type === "recliner" ? PRICE_RECLINER : PRICE_CLASSIC
      });
    }
    return seats;
  };
  const totalAmount = selectedSeats.reduce(
    (sum, seat) => sum + seat.price,
    0
  );
  const remainingSeats = ticketCount - selectedSeats.length;
  const proceedToPayment = () => {
    if (!email || !mobile) return;
    navigate("/movie-payment", {
      state: {
        movie,
        selectedSeats,
        totalPrice: totalAmount,
        time,
        email,
        mobile,
        lang: selectedLang,
        format: selectedFormat
      }
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 text-center">
      <h2 className="text-2xl font-bold mb-3">{movie.title}</h2>
      <p className="text-sm text-gray-600 mb-6">
        Language : {selectedLang} • Format : {selectedFormat} • Time: {time}
      </p>
      {/* Ticket Counter */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button className="px-3 py-1 bg-gray-300 rounded cursor-pointer"
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} >  - </button>
        <span className="text-lg font-bold">{ticketCount}</span>
        <button className="px-3 py-1 bg-gray-300 rounded cursor-pointer"
                onClick={() => setTicketCount(ticketCount + 1)} > + </button>
      </div>
      {/* Recliner Seats */}
      <div className="text-lg font-bold my-6">₹{PRICE_RECLINER} RECLINER</div>
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-2 min-w-max justify-center">
          <span className="w-6 font-semibold shrink-0">R</span>
          {generateSeats("R", 1, 22, "recliner").map(seat => (
            <Seat key={seat.id} seat={seat} selectedSeats={selectedSeats} onClick={handleSeatClick} />
          ))}
        </div>
      </div>
      {/* Classic Seats */}
      <div className="text-lg font-bold my-6">₹{PRICE_CLASSIC} CLASSIC</div>
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-col items-center min-w-max px-2">
          {classicRows.map(row => (
            <div key={row} className="flex items-center mb-3 gap-2">
              <span className="w-6 font-semibold shrink-0">{row}</span>
              <div className="flex gap-2">
                {generateSeats(row, 1, 7, "classic").map(seat => (
                  <Seat key={seat.id} seat={seat} selectedSeats={selectedSeats} onClick={handleSeatClick} />
                ))}
              </div>
              <div className="w-8"></div>
              <div className="flex gap-2">
                {generateSeats(row, 8, 19, "classic").map(seat => (
                  <Seat key={seat.id} seat={seat} selectedSeats={selectedSeats} onClick={handleSeatClick} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Seat Summary */}
      <div className="mt-8 text-lg font-semibold space-y-2">
        <div>
          Seats:
          {selectedSeats.length ? selectedSeats.map(s => s.id).join(", ") : " None"}
        </div>
        {remainingSeats > 0 && (
          <div className="text-red-500 text-sm">
            You still need to select {remainingSeats} more seat
            {remainingSeats > 1 ? "s" : ""}
          </div>
        )}
        <div>Total: ₹{totalAmount}</div>
      </div>
      {/* Proceed Button */}
      <button disabled={selectedSeats.length !== ticketCount} onClick={() => setShowTerms(true)}
              className={`mt-6 px-8 py-3 rounded-lg text-white font-semibold transition ${
                          selectedSeats.length !== ticketCount ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 cursor-pointer" }`}>
        Proceed
      </button>
      {/* Terms Modal */}
      {showTerms && (
        <Modal title="Terms & Conditions" onClose={() => setShowTerms(false)}
               onAccept={() => {
                  setShowTerms(false);
                  setShowContact(true);
                }}>
          <ol className="list-decimal pl-5 space-y-3 text-left text-sm text-gray-700">
            <li>The seat layout page is for representational purposes only.</li>
            <li>Ticket is compulsory for children of 3 years and above.</li>
            <li>Outside food and beverages are not allowed inside the cinema premises.</li>
            <li>Tickets once purchased cannot be exchanged or refunded.</li>
            <li>Management reserves the right to refuse admission.</li>
          </ol>
        </Modal>
      )}
      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b flex items-center gap-3">
              <button onClick={() => setShowContact(false)}
                      className="text-lg text-gray-600 hover:text-gray-800 transition" >
                <i className="bi bi-chevron-left cursor-pointer"></i>
              </button>
              <h2 className="text-lg font-semibold text-gray-800">Contact Details</h2>
            </div>
            <div className="px-6 py-4 space-y-6">
              <input type="email" placeholder="Your Email" value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full border p-2 rounded"/>
              <input type="tel" placeholder="Mobile Number" value={mobile}
                     onChange={(e) => setMobile(e.target.value)}
                     className="w-full border p-2 rounded"/>
            </div>
            <div className="px-6 py-4 border-t">
              <button disabled={!email || !mobile} onClick={proceedToPayment}
                      className={`w-full py-3 rounded text-white font-semibold 
                                  ${ !email || !mobile ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-rose-500 hover:bg-rose-600 cursor-pointer" }`}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const Seat = ({ seat, selectedSeats, onClick }) => {
  const isSelected = selectedSeats.find(s => s.id === seat.id);
  return (
    <button onClick={() => onClick(seat)}
            className={`w-8 h-8 text-xs sm:w-9 sm:h-9 md:w-10 md:h-10 border-2 rounded-md flex 
                        items-center justify-center transition cursor-pointer
                        ${ isSelected ? "bg-green-500 text-white border-green-500"
                             : "border-green-500 bg-white hover:bg-green-500 hover:text-white" }`}>
      {seat.number.toString().padStart(2, "0")}
    </button>
  );
};
const Modal = ({ title, children, onClose, onAccept }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[80vh] flex flex-col">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} className="text-gray-600 text-lg">×</button>
      </div>
      <div className="px-6 py-4 overflow-y-auto">{children}</div>
      {onAccept && (
        <div className="px-6 py-3 border-t flex gap-3">
          <button onClick={onClose}
                  className="flex-1 py-2 rounded-full border border-gray-300 text-gray-700 font-medium cursor-pointer">
            Cancel
          </button>
          <button onClick={onAccept}
                  className="flex-1 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium cursor-pointer" >
            Accept
          </button>
        </div>
      )}
    </div>
  </div>
);
export default SeatBooking;