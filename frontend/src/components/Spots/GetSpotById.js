import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpotsByTheirId } from '../../store/spots';
import EditSpotComponentFunc from './EditSpotComponent'

function GetSpotById() {
    let { spotId } = useParams();

    const dispatch = useDispatch();

    const history = useHistory();

    const spotById = useSelector(state => state.spots[spotId])
    console.log('the spot i look for in my component func', spotById)

    useEffect(() => {
        dispatch(getSpotsByTheirId(spotId))
    },[dispatch]);

    return (
            <div className="parent-div">
            <div className="hey-spot">{spotById?.name}, {spotById?.city}, {spotById?.state}
            </div>
            <div className="describe-spot">
                {spotById?.description}
            </div>
            <div className="pricing">
                ${spotById?.price}
            </div>
            <div className="edit-spot">
                <EditSpotComponentFunc spotId={spotId}/>
            </div>
            </div>
        )

}


export default GetSpotById;
