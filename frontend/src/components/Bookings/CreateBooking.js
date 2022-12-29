import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";
import { getSpotsBooksThunk, createBookingThunk, editingBookingThunk } from "../../store/bookings";
import moment from "moment-timezone";
import "./CreateBooking.css";

const CreateBookComponent = ({ spot }) => {

    let { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const dateString = "YYYY-MM-DD";
    const dateWithSeconds = "YYYY-MM-DD HH:mm:ss"

    const mingtian = moment().add(1, "day").format(dateString);

    const houtian = moment().add(2, "day").format(dateString);

    const [startDate, setStartDate] = useState(mingtian);
    const [endDate, setEndDate] = useState(houtian);


    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let when = {
            spotId: spot.id,
            startDate: moment(startDate).format(dateWithSeconds),
            endDate: moment(endDate).format(dateWithSeconds)
        }
        dispatch(createBookingThunk(when));
    };

    return (
        <div>
            <div className="error-up">
                <ul>
                    {errors.map((error, index)=> (
                        <li className="error-messages" key={index}>{error}</li>
                    ))}
                </ul>
            </div>

            <div className="booking-container">
                <div className="checking-in">
                    <div className="check-in">
                        Check-in
                    </div>
                    <input
                        type="date"
                        id="book-start"
                        name="check-in-book"
                        value={startDate}
                        className="book-start-input"
                        onChange={(e)=> setStartDate(e.target.value)}
                    >
                    </input>
                    <div className="check-out">
                        Check-out
                    </div>
                    <input
                        type="date"
                        id="book-end"
                        name="check-out-book"
                        value={endDate}
                        className="book-end-input"
                        onChange={(e)=> setEndDate(e.target.value)}
                    >
                    </input>
                </div>
                <div className="book-button">
                    <button onClick={handleSubmit}>Book this spot!</button>
                </div>
            </div>
    </div>
)


}

export default CreateBookComponent;
