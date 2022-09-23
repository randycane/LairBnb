import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ReviewsCards.css"

export default function ReviewsCard({ review }) {

    const dispatch = useDispatch();
    // reviews arranged here:

    const { spotId } = useParams();

    const selectedSpots = useSelector((state) => state.spots);
    const rightNowSpot = selectedSpots[spotId];


    //logic for if you are owner for delete and edit perms later
    const session = useSelector((state) => state.session);
    let currentUser = session.user;

    let user;
    if (currentUser) {
        user = currentUser.id;
    }

    let sessionOwner = false;

    if (rightNowSpot?.ownerId && currentUser) {
        sessionOwner = rightNowSpot?.ownerId === user;
    }

    return (
        <div className="review-box">
            <div className="review-written">
                {review.review}
            </div>
            <div className="stars-given">
                Stars: {review.stars}
            </div>
        </div>
    )
};
