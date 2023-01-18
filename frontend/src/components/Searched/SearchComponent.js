import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink, useHistory} from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import SpotsCards from "../SpotsCards";

function SearchedComponent() {
    const [spotsShowing, setSpotsShowing] = useState(false)

    const searchspots = useSelector((state) => state?.spots?.allSpots)
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

    },[dispatch, spotsShowing])



    return (
        <>
            {searchspots.length ? <div className="nav-search">Search Results For: {searchspots}</div> : <div className="in-search">No Results</div>}
            <div className="property-of">
                {searchspots.map((spot) => {
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
