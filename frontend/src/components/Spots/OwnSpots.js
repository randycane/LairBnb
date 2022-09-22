import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUserSpotsThunk } from "../../store/spots";
import SpotsCards from "../SpotsCards";

function OwnSpotsComponent() {
    const dispatch = useDispatch();

    const selectedSpots = useSelector(state => state.spots)

    const normalizedSpots = Object.values(selectedSpots);

    const [myList, setMyList] = useState(false);

    useEffect(() => {
        dispatch(getCurrentUserSpotsThunk()).then(()=>setMyList(true))
    }, [dispatch])

    return myList && (
        <div className="spots-container">
            <h1>My Listings</h1>

            <div className="my-spot-container">
                {normalizedSpots.map(spot => (
                    <div className="details">
                        <SpotsCards spot={spot} />
                    </div>))}
            </div>
        </div>
    )
}


export default OwnSpotsComponent;
