import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getMyOwnReviewsThunk} from "../../store/reviews";
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
    }, [dispatch]);

    return (
        <>
        <div className="reviews-container">
            {normalizedReviews.map(review => (
                <div className="review-details">
                    <ReviewsCard review ={review}/>
                    </div>
            ))}

            </div>
            </>
)

}

export default UserReviewsComponent;
