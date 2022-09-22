import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { createReviewsThunk } from "../../store/reviews";
import { getSpotsByTheirId } from "../../store/spots";
