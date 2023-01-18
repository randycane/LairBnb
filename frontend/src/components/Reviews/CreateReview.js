import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { createReviewsThunk } from "../../store/reviews";
// import { getSpotsByTheirId } from "../../store/spots";

export default function CreateReviewComponent() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  let { spotId } = useParams();
  spotId = Number(spotId);

  const sessionUser = useSelector((state) => state?.session.user);

  const normalizedReviews = useSelector((state) => Object.values(sessionUser));

  const listedReviews = normalizedReviews.map(
    (review) => review.userId === sessionUser.id
  );
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    let errorsArray = [];
    if (listedReviews.includes(true))
      errorsArray.push("Your review for this spot has already been listed.");
    else if (review.length < 1) errorsArray.push("Please provide a review.");
    else if (stars < 1 || stars > 5)
      errorsArray.push("Please provide a number between 1 - 5");

    setErrors(errorsArray);
  }, [review, stars]);

  let handleSubmit = async (e) => {
    e.preventDefault();

    setIsCreated(true);
    if (errors.length > 0) {
      return;
    }

    await dispatch(
      createReviewsThunk({
        review,
        stars,
        spotId,
      })
    );

    //await dispatch(getSpotsByTheirId(spotId));
    history.push(`/spots/${spotId}`);
    //return <Redirect to={`/spots/:spotId/reviews`} />
  };

  const ErrorMsgs = errors.map((error) => (
    <div className="errors" key={error}>
      {error}
    </div>
  ));

  return (
    <div className="create-review-container">
      <div className="encompass-form">
        <form className="review-form" onSubmit={handleSubmit}>
          <h1 className="review-title">Create a Review</h1>
          <div className="errors">{isCreated && ErrorMsgs}</div>

          <label className="create-review">
            <span> Review: </span>
            <input
              type="text"
              placeholder="Review Text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            //   required
            />
          </label>

          <label>
            <span> Stars (out of 5): </span>
            <input
              type="Number"
              min={1}
              max={5}
              placeholder="0"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            //   required
            />
          </label>
          <div className="create-wrap">
            <button className="created" type="submit">
              Create Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
