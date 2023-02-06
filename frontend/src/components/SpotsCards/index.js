import React, { useState, useEffect } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';

import "./SpotsCards.css"
import star from "./starrr.png"

export default function SpotsCards({spot}) {
    return (
        <div className="spots-container">
            <NavLink to={`/spots/${spot?.id}`}>
                <div className="image-show">
                    <img src ={spot?.previewImage} alt='House shown' className="image-show"></img>
                </div>
                <div className="underneath-the-image">
                    <div className="whole-spot-stuff">

            <div className="topline">
                <div className="spot-info-addy">
                    {spot?.city}, {spot?.state}
                </div>
                <div className="star-stuff">
                    <img src = {star} alt = "star"className="star" />
                    <div className="star-average">
                        {spot?.avgRating}
                    </div>
                    </div>
                        </div>
                <div className="spot-info">
                    {spot?.description}
                    </div>
                </div>
                    </div>
                <div className="price-by-night">
                    ${spot?.price} per night
                </div>
            </NavLink>
        </div>
    )


}
