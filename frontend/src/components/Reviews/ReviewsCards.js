import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ReviewsCardsComponent() {

    const dispatch = useDispatch();
    //review is dependent on the spot itself
    const { spotId } = useParams();

    const selectedSpots = useSelector((state) => state.spots);

    const nowSpot = selectedSpots[spotId];
}

export default ReviewsCardsComponent;
