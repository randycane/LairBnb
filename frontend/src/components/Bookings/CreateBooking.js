import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";
import { createBookingThunk } from "../../store/bookings";
import moment from "moment-timezone";

import "./CreateBooking.css";

const CreateBookComponent = ({ spot }) => {
  let { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state?.session?.user);

  let dateString = "YYYY-MM-DD";
  let dateWithSeconds = "YYYY-MM-DD HH:mm:ss";

  let mingtian = moment().add(1, "day").format(dateString);

  let houtian = moment().add(2, "day").format(dateString);

  const [startDate, setStartDate] = useState(mingtian);
  const [endDate, setEndDate] = useState(houtian);
  const [nights, setNights] = useState(2);
  console.log("this is my night spot", spot);
  const [price, setPrice] = useState(spot?.price * nights);
  const [clean, setClean] = useState(Math.ceil(spot?.price / 4));
  const [service, setService] = useState(Math.ceil(spot?.price / 10));
  const [finalPrice, setFinalPrice] = useState(price - clean + service);

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let when = {
      spotId: spot.id,
      startDate: moment(startDate).format(dateWithSeconds),
      endDate: moment(endDate).format(dateWithSeconds),
    };
    dispatch(createBookingThunk(when))
      .then(() => {
        let path = `/bookings/current`;
        history.push(path);
      })
      .catch(async (response) => {
        response = await response.json();
        setErrors(Object.values(response.errors));
      });
  };

  // useEffect(() => {
  //   setNights = moment(endDate).diff(moment(startDate), "days");
  //   setPrice = spot?.price * nights;
  //   setClean = price/ 10
  //   setService = price / 10;
  //   setFinalPrice = price - clean + service;

  // }, [startDate, endDate, nights, service, finalPrice]);

  return (
    <div>
      <div className="error-up">
        <ul>
          {errors.map((error, index) => (
            <li className="error-messages" key={index}>
              {error}
            </li>
          ))}
        </ul>
      </div>
      <div className="booking-container">
        <div className="checking-in">
          <div className="check-in">Check-in</div>
          <input
            type="date"
            id="book-start"
            name="check-in-book"
            value={startDate}
            className="book-start-input"
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          <div className="check-out">Check-out</div>
          <input
            type="date"
            id="book-end"
            name="check-out-book"
            value={endDate}
            className="book-end-input"
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
          <div className="underbelly">
            <div className="moneybelly">
              <span>
                <u>
                  ${spot?.price} x {nights} Nights:
                </u>
              </span>
              <span>${spot?.price * nights}</span>
            </div>
            <div>
              <span>
                <u>Cleaning Fee: </u>
              </span>
              <span>${clean.toFixed(2)}</span>
            </div>
            <div>
              <span>
                <u>Service Fee: </u>
              </span>
              <span>${service.toFixed(2)}</span>
            </div>
            <div className="costTotal">
              <span>
                <b>Total before taxes: </b>
              </span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="reserve-div">
          <button className="book-button" onClick={handleSubmit}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBookComponent;
