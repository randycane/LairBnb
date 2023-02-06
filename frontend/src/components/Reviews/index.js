import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getMyOwnReviewsThunk } from "../../store/reviews";
import { removeReviewsThunk } from "../../store/reviews";

import ReviewsCard from "./ReviewsCards";

// my own reviews:
//use this to both read and delete:
function UserReviewsComponent() {
  const dispatch = useDispatch();

  const selectedReviews = useSelector((state) => state.reviews);

  const normalizedReviews = Object.values(selectedReviews);

  useEffect(() => {
    dispatch(getMyOwnReviewsThunk());
    dispatch(removeReviewsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="reviews-container">
        <div className="reviewed-by-me">
          {normalizedReviews?.length > 0 ? "My Reviews" : "No Reviews"}
        </div>
        {normalizedReviews.map((review) => (
            <div className="review-details">
                <NavLink className="spot-link" to={`/spots/${review.spotId}`}>Review:</NavLink>
            <ReviewsCard review={review} />
          </div>
        ))}
      </div>
    </>
  );
}

export default UserReviewsComponent;
