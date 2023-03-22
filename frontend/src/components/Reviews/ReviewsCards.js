import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ReviewsCards.css";

import { removeReviewsThunk } from "../../store/reviews";
import { getSpotsByTheirId } from "../../store/spots";

export default function ReviewsCard({ review }) {
  const dispatch = useDispatch();
  // reviews arranged here:

  const { spotId } = useParams();

  const removeReview = async (reviewId) => {
    await dispatch(removeReviewsThunk(reviewId)).then(() => {
      dispatch(getSpotsByTheirId(spotId));
    });
  };

  return (
    <div className="review-box">
      <div className="review-written">{review.review}</div>
      <div className="stars-given">Stars: {review.stars}</div>
      <button className="delete-button" onClick={() => removeReview(review.id)}>
        Delete
      </button>
    </div>
  );
}
