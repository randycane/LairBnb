import { useEffect, useState } from "react";
import { createBookingThunk, getSpotsBooksThunk } from "../../store/bookings";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { format } from "date-fns";
import LoginFormModal from "../LoginFormModal/index";
import "./CreateBooking.css";

function CreateBookingComponent({ spot, star, review, booking }) {
  //let { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [today, setToday] = useState(
    new Date(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000) -
        new Date().getTimezoneOffset()
    )
  );
  const [tomorrow, setTomorrow] = useState(
    new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000)
  );
  const [startDate, setStartDate] = useState(format(today, "yyy-MM-dd"));
  const [endDate, setEndDate] = useState(
    format(new Date(today).getTime() + 120 * 60 * 60 * 1000, "yyy-MM-dd")
  );
  const [timeDifference, setTimeDifference] = useState(
    new Date(endDate).getTime() - new Date(startDate).getTime()
  );
  const [daysCount, setDaysCount] = useState(
    timeDifference / (1000 * 3600 * 24)
  );
  const [subTotal, setSubTotal] = useState(spot.price * daysCount);
  const [cleaningFee, setCleaningFee] = useState(Math.ceil(spot.price / 5));
  const [serviceFee, setServiceFee] = useState(Math.ceil(subTotal / 4));
  const [total, setTotal] = useState(subTotal - cleaningFee + serviceFee);

  const getDate = (today) => {
    let result;
    let month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    let day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    result = `${today.getFullYear()}-${month}-${day}`;
    return result;
  };

  useEffect(() => {
    let updatedStart = new Date(startDate);
    let updatedEnd = new Date(endDate);
    if (updatedStart.getTime() >= updatedEnd.getTime()) {
      setEndDate(
        format(
          new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000),
          "yyy-MM-dd"
        )
      );
      setTomorrow(
        new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000)
      );
    } else {
      setTomorrow(
        new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000)
      );
    }
    setErrors(errors);
  }, [startDate]);

  useEffect(() => {
    setTimeDifference(
      new Date(endDate).getTime() - new Date(startDate).getTime()
    );
    setDaysCount(timeDifference / (1000 * 3600 * 24));
    setSubTotal(spot.price * daysCount);
    setServiceFee(subTotal / 4);
    setTotal(subTotal - cleaningFee + serviceFee);
  }, [startDate, endDate, timeDifference, daysCount, subTotal, serviceFee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    try {
      const booking = await dispatch(
        createBookingThunk(spot.id, { startDate, endDate })
      );
      history.push(`/bookings/${booking.id}`);
    } catch (error) {
      const errors = await error.json();
      const newErrors = [];
      for (let error in errors.errors) {
        newErrors.push(errors.errors[error]);
      }
      setErrors(newErrors);
    }
  };
  const showLogin = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return (
    <div className="booking-container">
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-content-wrapper">
          <span className="price-wrapper">
            <strong>${spot.price}</strong> night
          </span>
        </div>
        <div className="underbelly">
          <div className="checkin-wrapper">
            <div className="checkin">Check-in</div>
            <input
              type="date"
              id="start"
              name="trip-start"
              value={startDate}
              className="checkin"
              minDate={format(today, "yyyy-MM-dd")}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          <div className="checkout-wrapper">
            <div className="checkout">Check-out</div>
            <input
              type="date"
              id="end"
              name="trip-start"
              value={endDate}
              className="checkout"
              minDate={format(tomorrow, "yyyy-MM-dd")}
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="booking-errors-container">
          {errors && errors.length > 0 && (
            <ul className="errors-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        {showModal && (
          <button className="login-modal">
            <LoginFormModal />
          </button>
        )}
        {sessionUser ? (
          <button
            className="book-button"
            onClick={handleSubmit}
            type="submit"
          >
            Reserve
          </button>
        ) : (
          <div className="login-condition">Login to book!</div>
        )}
        <p className="not-yet">You won't be charged yet</p>

        <div className="money-container">
          <div className="undermoney">
            <u>
              {formatter.format(spot.price)} x {daysCount}{" "}
              {daysCount === 1 ? "night" : "nights"}
            </u>
            <span>{formatter.format(subTotal)}</span>
          </div>
          <div className="undermoney">
            <u>Cleaning Fee</u>
            <span>{formatter.format(cleaningFee)}</span>
          </div>
          <div className="undermoney">
            <u>Service fee</u>
            <span>{formatter.format(serviceFee)}</span>
          </div>
          <div className="undermoney">
            <span>Total before taxes</span>
            <span>{formatter.format(total)}</span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateBookingComponent;
