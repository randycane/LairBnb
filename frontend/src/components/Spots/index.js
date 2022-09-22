import { getSpotsThunk} from "../../store/spots";
import SpotsCards from "../SpotsCards";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from 'react-router-dom';

import "./Spots.css"


function SpotsBrowser() {
    const dispatch = useDispatch();

    // use Selector to predict the state change
    const selectedSpots = useSelector(state => state.spots);

    //console.log('the spots im looking for in component', selectedSpots)
    const normalizedSpots = Object.values(selectedSpots)

    //console.log('my normal spots', normalizedSpots)



    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    //if (!normalizedSpots) return null;
    return (
        <div className="spots-container">
            {normalizedSpots.map(spot => (
                <div className="inside-card">
                    <SpotsCards spot={spot} />
                </div>
            ))}

                </div>
        )
}

export default SpotsBrowser;
