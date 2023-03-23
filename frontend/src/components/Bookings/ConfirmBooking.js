import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllBookingsThunk, getMyOwnBooksThunk } from "../../store/bookings";
import "./CreateBooking.css";

const BookingConfirmedComponent = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state?.session?.user);
  const normalizedBookings = useSelector((state) =>
    Object.values(state?.bookings)
  );
  const findBooking = normalizedBookings.find(
    (booking) => booking.id == bookingId
    );

  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("harry potter", normalizedBookings);
  // console.log("single harry", findBooking);
  // console.log("this is a numbner", bookingId);

  useEffect(() => {
    dispatch(getMyOwnBooksThunk());
    setIsLoaded(true);
    if (isLoaded && findBooking === undefined) {
      history.push("/");
    }
  }, [dispatch]);

  return (
    <div className="success-container">
      <div className="confirmed">Your reservation is confirmed</div>
      <div className="booked-city">
        You're going to {findBooking?.Spot?.city}!
      </div>
      <img className="booking-img" src={findBooking?.Spot?.Images[0].url}></img>
      <div className="booking-spot">{findBooking?.Spot?.name}</div>
      <div className="dates">
        <div className="start">Start Date: {findBooking?.startDate}</div>
        <div className="end">End Date: {findBooking?.endDate}</div>
      </div>
      <div className="checkout-div">
        <div className="check-in">Check in time is after 3 PM</div>
        <div className="checkout-time">Check out 11 AM</div>
      </div>

      <div className="link">
        <NavLink className="view" to={`/bookings/current`}>
          View your other bookings here!
        </NavLink>
      </div>
    </div>
  );
};

export default BookingConfirmedComponent;
