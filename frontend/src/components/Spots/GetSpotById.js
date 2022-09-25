import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpotsByTheirId, removeSpotsThunk } from '../../store/spots';
//import EditSpotComponentFunc from './EditSpotComponent'


import { Link } from "react-router-dom";
import { getSpotsReviewsThunk } from "../../store/reviews";

function GetSpotById() {
    let { spotId } = useParams();

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();

    const spotById = useSelector(state => state.spots[spotId])
    //('the spot i look for in my component func', spotById)

    // start the logic for delete, only if you are the owner:
    const session = useSelector((state) => state.session)


    const review = useSelector((state) => state.reviews)
    const reviewsArray = Object.values(review)

    //console.log('review array format', reviewsArray)
    const reviewMap = reviewsArray.map((review) => (
        <div className="reviews-container">
            <div className="actual-review-text">
                Review: {review.review}
            </div>
            <div className="actual-stars">
                Stars: {review.stars}
            </div>
        </div>
    ))

    //console.log('this is the review state', review)
    // check who is logged in, and if the id is the current user
    let currentUser = session.user;

    let thisUser;

    if (currentUser) {
        thisUser = currentUser.id
    }
    // initialize owner to false
    // only if spot's owner and session id matches we can delete:
    let owner = false;
    if (spotById?.ownerId && currentUser) {
        owner = spotById?.ownerId === thisUser;
    }

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

            {spotById?.Images && (<div className="image-container">
                <img src={spotById?.Images[0]?.url || spotById?.previewImage} className="actual-pic" alt="stuff" />
            </div>)}
            <div className="hey-spot">{spotById?.name}
            </div>
            <div className="spot-where">
            {spotById?.city}, {spotById?.state}
            </div>
            <div className="describe-spot">
                {spotById?.description}
            </div>
            <div className="pricing">
                ${spotById?.price} per night
            </div>
            <div className="how-many-reviews">
                Number of Reviews: {spotById?.numReviews}
            </div>
            <div className="avg-rating">
                Average Stars: {spotById?.avgStarRating}
            </div>
            <div className="let-there-be-review">
                {reviewMap}
            </div>
            {!owner && (
                < div className="write-review">
                    <Link to={`/spots/${spotId}/new`} className="form-button" >Create Review</Link>
                    </div>
            )}
            {owner && (<div className="edit-redirected-button">
                <Link to={`/spots/${spotId}/update`} className="form-button" >Edit Spot</Link>
            </div>)}
            {owner && (<div className="delete-spot"
                onClick={(e) => removeButton(e)}>
                <button className="creation-button" type="submit">
                        Delete Spot
                    </button>
                </div>)}
            </div>
        )

}


export default GetSpotById;
