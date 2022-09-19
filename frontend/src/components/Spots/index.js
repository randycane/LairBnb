import spotsReducer, { getSpotsThunk } from "../../store/spots";

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from 'react-router-dom';


function SpotsBrowser() {
    const dispatch = useDispatch();

    // const [theSpot, setTheSpot] = useState();

    // use Selector to predict the state change
    const selectedSpots = useSelector(state => state.spots);
    console.log('the spots im looking for in component', selectedSpots)
    const normalizedSpots = Object.values(selectedSpots)
    console.log('my normal spots', normalizedSpots)
    // console.log('yooooooooooo', spot);


    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    if (!normalizedSpots) return null;
    return (<div>
        <div>
        {normalizedSpots.map(spot => (
            <div>
                {spot.name}, {spot.city}, {spot.state}, {spot.price}
            </div>
        ))}
        </div>
    </div>)

}

export default SpotsBrowser;
