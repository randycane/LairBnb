import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import moment from "moment";

import { getMyOwnBooksThunk, removeBookingThunk } from "../../store/bookings";

function DeleteBookComponent({ booking, onClick }) {
    let dispatch = useDispatch();
    let history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(removeBookingThunk(booking.id))
        dispatch(getMyOwnBooksThunk())
        onClick();
    }

    return (
        <div className="deletion-top">
            <div className="deletion-head">
                <div className="actual-delete">
                    Delete this reservation?
                </div>
                <div className="deletion-confirm">
                    Do you want to confirm this cancellation?
                </div>
            </div>
            <div className="underbelly-container">
                <div className="choose" onClick={onClick}>
                    Cancel
                </div>
                <div className="choose" onClick={onSubmit}>
                    Delete
                </div>
            </div>
        </div>
    )
}

export default DeleteBookComponent;
