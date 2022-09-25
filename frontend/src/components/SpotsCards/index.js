

import React, { useState, useEffect } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';

import "./SpotsCards.css"

export default function SpotsCards({spot}) {
    return (
        <div className="spots-container">
            <NavLink to={`/spots/${spot?.id}`}>
                <div className="image-show">
                    <img src ={spot?.previewImage} alt='House shown' className="image-show"></img>
                    </div>
                <div className="spot-info">
                    {spot?.name}
                </div>
                <div className="spot-info">
                    {spot?.city}, {spot?.state}
                </div>
                <div className="spot-info">
                    {spot?.description}
                </div>
                <div className="price-by-night">
                    ${spot?.price}
                </div>
            </NavLink>
        </div>
    )


}
