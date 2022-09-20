import React, { useEffect, useState } from "react";
import { useHistory, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { editSpotsThunk } from "../../store/spots";

function EditSpotComponent() {

    let { spotId } = useParams();
    spotId = Number(spotId);

    const dispatch = useDispatch();

    const history = useHistory();

    const spot = useSelector(state => state.spotId)

   //const changedSpot = spots[spotId];

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);

    const [errors, setErrors] = useState([]);

    const [spotChanged, setSpotChanged] = useState(false);

    useEffect(() => {
        // this error array is scoped within this use effect
        let errorArray = [];
        if (address.length === 0) errorArray.push("Street Address is required");
        if (name.length === 0) errorArray.push("Name field is required");
        if (city.length === 0) errorArray.push("City is required");
        if (state.length === 0) errorArray.push("State is required");
        if (country.length === 0) errorArray.push("Country is required");
        if (description.length === 0) errorArray.push("Description is required");
        if (!price) errorArray.push("Price per day or night is required.");

        setErrors(errorArray);
    }, [address, name, city, state, country, description, price]);

    let handleSubmit = (e) => {
        e.preventDefault();


        setSpotChanged(true)
        if (errors.length > 0) {
            return;

        }
        const spotChanged = dispatch(editSpotsThunk({
            address,
            name,
            city,
            state,
            country,
            lat,
            lng,
            description,
            price,
        }, spotId))

        history.push(`/spots/${spotChanged.id}`)

        // const ErrorMsgs = errors.map((error) => {
        //     <ul className="error-msgs" key={error}>
        //     </ul>
        // })

    }
    return (
        <div className="edit-spot-container">
        <form
          className="edit-spot" onSubmit={handleSubmit}>

          <h1 className="title">Edit Your Spot</h1>
            <ul className="changed">
                {spotChanged}
                </ul>

          <label className="create-name">
                    <span> Name: </span>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Address:</span>
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    <span>City:</span>
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    <span>State:</span>
                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <label className="form-country">
                    <span>Country:</span>
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label className="form-lat">
                    <span>Latitude:</span>
                    <input
                        type="Number"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <label className="form-lng">
                    <span>Longitude:</span>
                    <input
                        type="Number"
                        placeholder="Longitude"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                <label className="form-description">
                    <span>Description:</span>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label className="form-price">
                    <span>Price per night:</span>
                    <input
                        type="Number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <div className="submit-spot-button">
                    <button className="creation-button" type="submit">
                        Edit Listing
                    </button>
            </div>
        </form>
        </div>
      );

}

export default EditSpotComponent;
