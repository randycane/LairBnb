import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState} from "react";
import { Redirect } from "react-router";
import { createReviewsThunk } from "../../store/reviews";
import { getSpotsByTheirId } from "../../store/spots";

export default function CreateReviewComponent() {

    const dispatch = useDispatch();

    const history = useHistory();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);

    let { spotId } = useParams();
    spotId = Number(spotId);
    //check spot id
    console.log('i want this to be a number', spotId)

    const sessionUser = useSelector(state => state.session.user);
    // check session state
    console.log('i am the current user state', sessionUser)

    const normalizedReviews = useSelector(state => Object.values(sessionUser));
    // this is an empty array right now:
    console.log('i am the array of reviews', normalizedReviews)

    const listedReviews = normalizedReviews.map(review => review.userId === sessionUser.id)
    const [isCreated, setIsCreated] = useState(false);


    useEffect(() => {
        let errorsArray = []
        if (listedReviews.includes(true)) errorsArray.push("Your review for this spot has already been listed.")
        else if (review.length < 1) errorsArray.push("Please provide a review.")
        else if (stars < 1 || stars > 5) errorsArray.push("Please provide a number between 1 - 5")

        setErrors(errors)


    }, [review, stars])


    let handleSubmit = async (e) => {
        e.preventDefault();

        setIsCreated(true)
        if (errors.length > 0) {
            return;
        }
        // try before

        // let newReview = await dispatch(createReviewsThunk({
        //     review,
        //     stars,
        // }))

        //try two
        await dispatch(createReviewsThunk({
            review,
            stars,
            spotId
        }))

        //await dispatch(getSpotsByTheirId(spotId));

        //try a redirect way:
        if (isCreated) {
            //history.push(`/spots/${spotId}`)
            return <Redirect to={`/spots/:spotId/reviews`} />
        }
    };

    const ErrorMsgs = errors.map(error => (
        <li className="error-messages" key={error}>{error}</li>
    ));

    return (
        <div className="create-review-container">
        <form
              className="review-form" onSubmit={handleSubmit}>
              <h1 className="review-title">Create a Review</h1>
              <ul className="errors">
                {isCreated && ErrorMsgs}
              </ul>

              <label className="create-review">
                 <span> Review: </span>
                    <input
                        type="text"
                        placeholder="Review Text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
              </label>

              <label>
                <span> Stars: </span>
                <input
                    type="Number"
                    min={1}
                    max={5}
                    placeholder="0"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    />
                </label>
            <div className="submit-review">
              <button
                type="submit">
                        Create Review

              </button>
            </div>
        </form>
    </div>
    )

}
