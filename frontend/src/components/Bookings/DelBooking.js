import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";

import { getMyOwnBooksThunk, removeBookingThunk } from "../../store/bookings";
import "./CreateBooking.css";

function DeleteBookComponent({ booking, onClick }) {
  let dispatch = useDispatch();
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(removeBookingThunk(booking.id));
    dispatch(getMyOwnBooksThunk());
    onClick();
  };

  return (
    <div className="deletion-top">
      <div className="deletion-head">
        <div className="actual-delete">Delete this reservation?</div>
        <div className="deletion-confirm">
          Please confirm this cancellation below:
        </div>
      </div>
      <div className="underbelly-container">
        <div className="choose-one" onClick={onClick}>
          Exit
        </div>
        <div className="choose-two" onClick={onSubmit}>
          Cancel!
        </div>
      </div>
    </div>
  );
}

export default DeleteBookComponent;
