import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarController from "./Components/Navbar/NavbarController";
import Footer from "./Components/Footer/Footer";
import MainPage from "./Components/Movies/MainPage";
import Gallery from "./Components/Movies/Gallery";
import MovieDetail from "./Components/Movies/MovieDetail";
import ShowtimesPage from "./Components/Movies/ShowTimesModel";
import SeatsPage from "./Components/Movies/ShowSeatCount";
import ShowPayment from "./Components/Movies/ShowPayment";
import ShowPaymentSuccess from "./Components/Movies/ShowPaymentSuccess";
import Streams from "./Components/Streams/Streams";
import Events from "./Components/Events/Events";
import Activities from "./Components/Activities/Activities";
import ActivityPayment from "./Components/Activities/ActivityPayment";
import ActivitySuccess from "./Components/Activities/ActivitySuccess";
import ActivityBooking from "./Components/Activities/ActivityBooking";
import Sports from "./Components/Sports/Sports";
import SportsBooking from "./Components/Sports/SportsBooking";
import SportsPayment from "./Components/Sports/SportsPayment";
import SportsPaymentSuccess from "./Components/Sports/SportsPaymentSuccess";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router basename="/book-my-ticket">
        <NavbarController/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/Movies-Pg" element={<Gallery/>}/>
          <Route path="/Movie/:id" element={<MovieDetail/>}/>
          <Route path="/search/:id" element={<MovieDetail />} />
          <Route path="/showtimes/:id" element={<ShowtimesPage />} />
          <Route path="/seats/:id" element={<SeatsPage />} />
          <Route path="/movie-payment" element={<ShowPayment />} />
          <Route path="/movie-payment-success" element={<ShowPaymentSuccess />} />
          <Route path="/Stream-Pg" element={<Streams/>}/>
          <Route path="/Events-Pg" element={<Events/>}/>
          <Route path="/Sports-Pg" element={<Sports/>}/>
          <Route path="/sports/:id" element={<SportsBooking />} />
          <Route path="/sports-payment" element={<SportsPayment />} />
          <Route path="/sports-payment-success" element={<SportsPaymentSuccess />} />
          <Route path="/Activities-Pg" element={<Activities/>}/>
          <Route path="/activity-booking/:id" element={<ActivityBooking/>} />
          <Route path="/activity-payment" element={<ActivityPayment/>} />
          <Route path="/activity-success" element={<ActivitySuccess/>} />
        </Routes>
        <Footer/>
    </Router>
    </div>
  )
}
export default App