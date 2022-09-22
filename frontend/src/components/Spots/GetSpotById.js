import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpotsByTheirId, removeSpotsThunk } from '../../store/spots';
import EditSpotComponentFunc from './EditSpotComponent'


import { Link } from "react-router-dom";

function GetSpotById() {
    let { spotId } = useParams();

    const dispatch = useDispatch();

    const history = useHistory();

    const spotById = useSelector(state => state.spots[spotId])
    console.log('the spot i look for in my component func', spotById)

    // start the logic for delete, only if you are the owner:
    const session = useSelector((state) => state.session)

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
    }, [dispatch]);

    //remove the spot button logic after getting which spot by id:
    const removeButton = async (e) => {
        e.preventDefault();

        await dispatch(removeSpotsThunk(spotId));

        history.push('/');
    }

    return (
            <div className="parent-div">
            <div className="hey-spot">{spotById?.name}
            </div>
            <div className="spot-where">
            {spotById?.city}, {spotById?.state}
            </div>
            <div className="describe-spot">
                {spotById?.description}
            </div>
            <div className="pricing">
                ${spotById?.price}
            </div>
            {/* <div className="edit-spot">
                <EditSpotComponentFunc spotId={spotId}/>
            </div> */}
            <div className="edit-redirected-button">
                <Link to ={`/spots/${spotId}/update`} className= "edit-redirected-button" >Edit Spot</Link>
            </div>
            <div className="delete-spot"
                onClick={(e) => removeButton(e)}>
                <button className="creation-button" type="submit">
                        Delete Spot
                    </button>
                </div>
            </div>
        )

}


export default GetSpotById;
