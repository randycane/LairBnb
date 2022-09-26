import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpotsByTheirId, removeSpotsThunk } from '../../store/spots';
//import EditSpotComponentFunc from './EditSpotComponent'

import ReviewsCard from "../Reviews/ReviewsCards";

import { removeReviewsThunk } from "../../store/reviews";

import star from "../SpotsCards/starrr.png"
import { Link } from "react-router-dom";
import { getSpotsReviewsThunk } from "../../store/reviews";

function GetSpotById() {
    let { spotId } = useParams();

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();

    const spotById = useSelector(state => state?.spots[spotId])
    //console.log('the spot i look for in my component func', spotById)

    // the logic for delete spot, only if you are the owner:
    const session = useSelector((state) => state.session)
    //logic for delete review
    const sessionAuthor = useSelector((state) => state.session.user)

    const review = useSelector((state) => state?.reviews)
    //console.log('review state now', review)
    const reviewsArray = Object.values(review)

    const removeReview = async (reviewId) => {
        await dispatch(removeReviewsThunk(reviewId)).then(() => {
            dispatch(getSpotsByTheirId(spotId)).then(() => {
                dispatch(getSpotsReviewsThunk(spotId));
             })
        })

    }
    let currentUser = session.user;
    //console.log('i am loggin in as this', currentUser)

    let thisUser;

    if (currentUser) {
        thisUser = currentUser.id
    }

    //console.log('session user state', thisUser)
    //console.log('state of review rn', review)

    // only if spot's owner and session id matches we can delete spot:
    let owner = false;
    if (spotById?.ownerId && currentUser) {
        owner = spotById?.ownerId === thisUser;
    }
    console.log('review array format', reviewsArray)
    const reviewMap = reviewsArray.map((review) => (
        <div className="reviews-container">
            <div className="nest-review">
                <div className="writtenby">

                Review by: {review?.User?.firstName}

            </div>
            <div className="actual-stars">
                <img src={star} alt="rate" className="starry" />
                <div className="star-int">{review?.stars}
                    </div>
                    </div>
            <div className="actual-review-text">
                {review?.review}
            </div>
            </div>
            {(sessionAuthor?.id === review.userId &&
                <div className="remove-button">
                <button className="delete-button" onClick={() => removeReview(review.id)}>Delete</button>
                </div>
        )
            }
        </div>
    ))


    useEffect(() => {
        dispatch(getSpotsByTheirId(spotId))
        dispatch(getSpotsReviewsThunk(spotId))
        setIsLoaded(true)
    }, [dispatch, isLoaded, spotId]);



    //remove the spot button logic after getting which spot by id:
    const removeButton = async (e) => {
        e.preventDefault();

        await dispatch(removeSpotsThunk(spotId));

        history.push('/');
    }

    //let checkingImage = spotById?.Images[0]?.url || spotById?.previewImage

    return isLoaded && (

        <div className="parent-div">

            <div className="encompass-spot">
            <div className="hey-spot">{spotById?.name}
                </div>
                <div className="ratings-and-where">
                <div className="avg-rating">
                <img src = {star} alt= "rate" className="starry"/> {Number(spotById?.avgStarRating).toFixed(2)}
                    </div>
                    <div className="how-many-reviews">
                {spotById?.numReviews} Total Review(s)
            </div>
            <div className="spot-where">
            {spotById?.city}, {spotById?.state}
                </div>
                    </div>
            {spotById?.Images && (<div className="image-container">
                <img src={spotById?.Images[0]?.url || spotById?.previewImage} className="actual-pic" alt="stuff" />
            </div>)}


                <div className="spot-big-nest">
                <div className="first-info">
            <div className="describe-spot">
                Description: {spotById?.description}
                </div>
                </div>
                <div className="spot-right-card">
            <div className="pricing">
                ${spotById?.price} per night
            </div>
            <div className="how-many-reviews">
                {spotById?.numReviews} Total Review(s)
            </div>
            <div className="avg-rating">
                            <img src={star} alt="rate" className="starry" /> {Number(spotById?.avgStarRating).toFixed(2)}
                </div>
                </div>
                </div>
            <div className="let-there-be-review">
                {reviewMap}
                </div>
            {currentUser && !owner && (
                < div className="write-review">
                    <Link to={`/spots/${spotId}/reviews`} className="new-review" >Create Review</Link>
                    </div>
            )}
            {owner && (<div className="edit-redirected-button">
                <Link to={`/spots/${spotId}/update`} className="edit-spot" >Edit Spot</Link>
            </div>)}
            {owner && (<div className="delete-spot"
                onClick={(e) => removeButton(e)}>
                <button className="deletion-button" type="submit">
                        Delete Spot
                    </button>
                </div>)}
                </div>
            </div>
        )

}


export default GetSpotById;
