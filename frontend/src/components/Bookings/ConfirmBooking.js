import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyOwnBooksThunk } from "../../store/bookings";
import "./CreateBooking.css";

const BookingConfirmedComponent = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => Object.values(state.bookings));
  const booking = bookings.find((booking) => booking.id === (bookingId));
    const [isLoaded, setIsLoaded] = useState(false);

    console.log("harry potter", bookings)
    console.log("single harry", booking)
    console.log("thjis is a numbner", bookingId)

  useEffect(() => {
    dispatch(getMyOwnBooksThunk());
    setIsLoaded(true)
    if (isLoaded && booking === undefined) {
        history.push("/")
    }
  }, [dispatch]);

  return (
    <div className="success-container">
      <div className="confirmed">Your reservation is confirmed</div>
      <div className="booked-city">You're going to {booking?.Spot?.city}!</div>
      <div className="booking-spot">{booking?.Spot?.name}</div>
      <div className="dates">
        <div className="start">Start Date: {booking?.startDate}</div>
        <div className="end">End Date: {booking?.endDate}</div>
      </div>
      <div className="checkout-div">
      <div className="check-in">Check in time is after 3 PM</div>
      <div className="checkout-time">Check out 11 AM</div>
      </div>

      <div className="link">
      <NavLink className="view" to={`/currentUser/bookings`}>View your other bookings here!</NavLink>
      </div>
    </div>
  );
};

export default BookingConfirmedComponent;
