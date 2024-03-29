import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";

import { getMyOwnBooksThunk, removeBookingThunk } from "../../store/bookings";
// import DeleteBookComponent from "./DelBooking";
import DeleteBookingModal from ".";
import "./CreateBooking.css";

function MyBookingComponent() {
  const dispatch = useDispatch();

  const ownBookings = useSelector((state) => Object.values(state?.bookings));

  useEffect(() => {
    dispatch(getMyOwnBooksThunk());
  }, [dispatch, JSON.stringify(ownBookings)]);
  return (
    <div className="my-container">
      <div className="trips">Trips</div>
      <div className="upcoming">Upcoming Reservations</div>
      {ownBookings?.map((booking) => {
        return (
          <div key={booking.id} className="which-booking">
            <div className="booking-spot">{booking.Spot.name}</div>
            <div className="booking-info">
              <NavLink
                className="place-picture"
                to={`/spots/${booking?.Spot?.id}`}
              >
                <div className="spot-details">
                  <div className="starting-date">
                    Start Date: {booking?.startDate}
                  </div>
                  <div className="ending-date">
                    End Date: {booking?.endDate}
                  </div>
                  <div>{booking.Spot.address}</div>
                  <div>
                    {booking.Spot.city}, {booking.Spot.country}
                  </div>
                </div>
                <img
                  className="res-preview"
                  src={booking.Spot?.Images[0].url}
                ></img>
              </NavLink>
            </div>
            <div className="deletion-button">
              <DeleteBookingModal booking={booking} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyBookingComponent;
