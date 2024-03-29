import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotsByTheirId, removeSpotsThunk } from "../../store/spots";
//import EditSpotComponentFunc from './EditSpotComponent'

import ReviewsCard from "../Reviews/ReviewsCards";

import { removeReviewsThunk } from "../../store/reviews";

import star from "../SpotsCards/starrr.png";
import { Link } from "react-router-dom";
import { getSpotsReviewsThunk } from "../../store/reviews";

import { getSpotsBooksThunk, createBookingThunk } from "../../store/bookings";
import CreateBookingComponent from "../Bookings/BookBooking";

import "./Spots.css";

function GetSpotById() {
  let { spotId } = useParams();

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  const spotById = useSelector((state) => state?.spots[spotId]);

  // the logic for delete spot, only if you are the owner:
  const session = useSelector((state) => state.session);
  //logic for delete review
  const sessionAuthor = useSelector((state) => state.session.user);

  const review = useSelector((state) => state?.reviews);
  const reviewsArray = Object.values(review);

  const removeReview = async (reviewId) => {
    await dispatch(removeReviewsThunk(reviewId)).then(() => {
      dispatch(getSpotsByTheirId(spotId)).then(() => {
        dispatch(getSpotsReviewsThunk(spotId));
      });
    });
  };
  let currentUser = session.user;
  let thisUser;
  if (currentUser) {
    thisUser = currentUser.id;
  }

  // only if spot's owner and session id matches we can delete spot:
  let owner = false;
  if (spotById?.ownerId && currentUser) {
    owner = spotById?.ownerId === thisUser;
  }
  const reviewMap = reviewsArray.map((review) => (
    <div className="reviewed-container">
      <div className="nest-review">
        <div className="writtenby">Reviewed by: {review?.User?.firstName}</div>
        <div className="actual-stars">
          <img src={star} alt="rate" className="starry" />
          <div className="star-int">{review?.stars}</div>
        </div>
        <div className="actual-review-text">{review?.review}</div>
      </div>
      {sessionAuthor?.id === review.userId && (
        <div className="remove-button">
          <button
            className="delete-button"
            onClick={() => removeReview(review.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  ));

  const booking = useSelector((state) => state?.bookings);
  const normalizedBooking = Object.values(booking);
  //   console.log("booking", booking);
  //   console.log("normalizedBooking", normalizedBooking);

  const bookMap = normalizedBooking.map((book) => (
    <div className="book-first">
      {book?.startDate}, to
      {book?.endDate}
    </div>
  ));

  useEffect(() => {
    dispatch(getSpotsByTheirId(spotId));
    dispatch(getSpotsReviewsThunk(spotId));
    dispatch(getSpotsBooksThunk(spotId));
    setIsLoaded(true);
  }, [dispatch, isLoaded, spotId]);

  //remove spot button after getting which spot by id:
  const removeButton = async (e) => {
    e.preventDefault();
    await dispatch(removeSpotsThunk(spotId));
    history.push("/");
  };

  //let checkingImage = spotById?.Images[0]?.url || spotById?.previewImage

  return (
    isLoaded && (
      <div className="parent-div">
        <div className="encompass-spot">
          <div className="hey-spot">{spotById?.name}</div>
          <div className="ratings-and-where">
            <div className="avg-rating">
              <img src={star} alt="rate" className="starry" />{" "}
              {Number(spotById?.avgStarRating).toFixed(2)}
            </div>
            <div className="how-many-reviews">
              {spotById?.numReviews} Total Review(s)
            </div>
            <div className="spot-where">
              {spotById?.city}, {spotById?.state}
            </div>
          </div>
          {spotById?.Images && (
            <div className="image-container">
              <img
                src={spotById?.Images[0]?.url || spotById?.previewImage}
                className="actual-pic"
                alt="stuff"
              />
            </div>
          )}

          <div className="spot-big-nest">
            <div className="first-info">
              <div className="describe-spot">
                Description: {spotById?.description}
              </div>
            </div>
            <div className="spot-right-card">
              <div className="pricing">${spotById?.price} per night</div>
              <div className="how-many-reviews">
                {spotById?.numReviews} Total Review(s)
              </div>
              <div className="avg-rating">
                <img src={star} alt="rate" className="starry" />{" "}
                {Number(spotById?.avgStarRating).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="outer-bookings">
            <div className="let-there-be-bookings">
              <CreateBookingComponent spot={spotById} />
            </div>
          </div>

          <div className="let-there-be-review">{reviewMap}</div>
          {currentUser && !owner && (
            <div className="write-review">
              <Link to={`/spots/${spotId}/reviews`} className="new-review">
                Create Review
              </Link>
            </div>
          )}
          {owner && (
            <div className="edit-redirected-button">
              <Link
                to={`/spots/${spotId}/update`}
                className="make-edits-to-my-spot"
              >
                Edit Spot
              </Link>
            </div>
          )}
          {owner && (
            <div className="delete-spot" onClick={(e) => removeButton(e)}>
              <button className="deletion-button" type="submit">
                Delete Spot
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default GetSpotById;
