import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink, useHistory} from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import SpotsCards from "../SpotsCards";
import "./Searched.css";

function SearchedComponent() {
    const [spotsShowing, setSpotsShowing] = useState(false)

    const spots = useSelector((state) => state?.spots)
    const normalizedSpots = Object.values(spots);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const url = new URL(window.location.href)
        const searchParameters = url.searchParams
        (async () => {
            let searchInput = searchParameters.get("input");
            await dispatch(getSpotsThunk(searchInput));
            setSpotsShowing(!spotsShowing);
          })();

    },[])


    return (
        <>
            {normalizedSpots.length ? <div className="nav-search">Search Results For: {normalizedSpots}</div> : <div className="in-search">No Results</div>}
            <div className="property-of">
                {normalizedSpots.map((spot) => {
                    return <div className="spotsss">
                        <NavLink to={`/spots/${spot}`}>
                            <SpotsCards/>
                        </NavLink>
                    </div>
                })}
                </div>
            </>
    )
}

export default SearchedComponent;
