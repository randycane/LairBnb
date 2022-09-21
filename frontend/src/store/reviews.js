

import { csrfFetch } from './csrf';

//action creators:
const LOAD_REV = '/reviews/LOAD';
const CREATE_REV = '/reviews/CREATE';
const UPDATE_REV = '/reviews/UPDATE';
const DELETE_REV = '/reviews/DELETE';

const loadReviews = list => ({
    type: LOAD_REV,
    list
})

const createRevs = list => {
    return {
        type: CREATE_REV,
        list
    }
}
// thunk not made yet:
const updateRevs = payload => {
    return {
        type: UPDATE_REV,
        payload
    }
}

const removeRevs =  payload => {
    return {
        type: DELETE_REV,
        payload
    }
}

//thunks:
export const getReviewsThunk = () => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}reviews`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadReviews(list));
    }
}

export const createReviewsThunk = (list) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
      });

      if (response.ok) {
        const newRev = await response.json()
        dispatch(createRevs(newRev))
        return newRev;
      }
    return response;
}

export const removeReviewsThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removeRevs(reviewId))

    }
    return response;
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REV: {
            const reviewsObjState = {};
            action.list.forEach(review => {
                reviewsObjState[review.id] = review;
            })
            return reviewsObjState
        };
        case CREATE_REV: {
            const newState = {};
            action.list.forEach(review => {
                newState[review.id] = review;
            })
            return newState;
        };
        case DELETE: {
            const delState = { ...state };
            delete delState[action.reviewId]
            return delState;
        };
        default: return state
    }

}

export default reviewsReducer;
