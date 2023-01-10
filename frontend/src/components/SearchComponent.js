import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import SpotsCards from "./SpotsCards";

function SearchBarComponent() {
    const [properties, setProperties] = useState([])
    let url = new URL(window.location.href)
    const searchParameters = url.searchParams

    const spot = searchParameters.get('spot');
    const searchInput = searchParameters.get('input');

    const search = spot ? spot : searchInput;


    return (
        <>
            {properties.length ? <div className="nav-search">Search Results For: {search}</div> : <div className="nav-search">No Results</div>}
            <div className="property-of">
                {properties.map((property) => {
                    return <div className="spotsss">
                        <Link to={`/spots/${spot}`}>
                            <SpotsCards property={spot} />
                        </Link>
                    </div>
                })}
                </div>
            </>
    )

}

export default SearchBarComponent;
