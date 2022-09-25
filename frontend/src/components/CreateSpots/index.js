import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";


import { addImgThunk, createSpotsThunk } from "../../store/spots";

function CreateNewSpotComponent() {
    const dispatch = useDispatch();

    const history = useHistory();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);

    const [spotCreated, setSpotCreated] = useState(false);


    useEffect(() => {
        // this error array is scoped within this use effect
        let errorArray = [];
        if (!address) errorArray.push("Street Address is required");
        if (!name) errorArray.push("Name field is required");
        if (!city) errorArray.push("City is required");
        if (!state) errorArray.push("State is required");
        if (!country) errorArray.push("Country is required");
        if (!description) errorArray.push("Description is required");
        if (!price) errorArray.push("Price per day or night is required.");
        if(!image) errorArray.push("Please provide valid image.")

        setErrors(errorArray);
    }, [address, name, city, state, country, description, price, image]);

    let handleSubmit = async (e) => {
        e.preventDefault();


        setSpotCreated(true)
        if (errors.length > 0) {
            return;

        }
        let newSpot = await dispatch(createSpotsThunk({
            address,
            name,
            city,
            state,
            country,
            lat,
            lng,
            description,
            price,

        }))
        dispatch(addImgThunk({ imageableId: true, url: image }, newSpot.id))
        //console.log('made a spot', newSpot);

        history.push(`/spots/${newSpot.id}`)


    }


    const ErrorMsgs = errors.map((error) => (

        < ul className = "error-msgs" key = { error } >
            { error }
        </ul >

    ))

    return (
        <div className="create-main-container">
            <form className="spot-new" onSubmit={handleSubmit}>
                <ul>
                    {spotCreated && ErrorMsgs}
                </ul>
                <h1 className="create-spot-class">List your property here!</h1>
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
                <label className="form-image">
                    <span>Photo:</span>
                    <input
                    type="text"
                    name="image"
                    placeholder="image url"
                    value={image}
                    onChange={(e)=> setImage(e.target.value)}/>
                    </label>
                <div className="submit-spot-button">
                    <button className="creation-button" type="submit">
                        Create New Listing
                    </button>
                </div>
            </form>
        </div>
    )
}


export default CreateNewSpotComponent;
