

import React, { useState, useEffect } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';

import "./SpotsCards.css"

export default function SpotsCards({spot}) {
    return (
        <div className="spots-container">
            <NavLink to={`/spots/${spot?.id}`}>
                <div className="image-show">
                    <img src={spot?.previewImage} alt='House'></img>
                    </div>
                <div className="container-spot-name">
                    {spot?.name}
                </div>
                <div className="container-spot-where">
                    {spot?.city}, {spot?.state}
                </div>
                <div className="spot-description">
                    {spot?.description}
                </div>
                <div className="price-by-night">
                    ${spot?.price}
                </div>
            </NavLink>
        </div>
    )


}
