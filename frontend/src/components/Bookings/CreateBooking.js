import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";
import { getSpotsBooksThunk, createBookingThunk, editingBookingThunk } from "../../store/bookings";
import moment from "moment-timezone";

const CreateBookComponent = ({ spot }) => {

    let { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);

}

export default CreateBookComponent;
