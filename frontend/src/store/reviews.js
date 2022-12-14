

import { csrfFetch } from './csrf';

//action creators:
const LOAD_REV = '/reviews/LOAD';
const CREATE_REV = '/reviews/CREATE';
const UPDATE_REV = '/reviews/UPDATE';
const DELETE_REV = '/reviews/DELETE';

const LOAD_MY_REVS = '/reviews/LOAD_BY_USER';

const loadReviews = list => ({
    type: LOAD_REV,
    list
})

const loadMyOwnReviews = list => ({
    type: LOAD_MY_REVS,
    list
})

const createRevs = list => {
    return {
        type: CREATE_REV,
        list
    }
}
// unused:
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
export const getSpotsReviewsThunk = (spotId) => async dispatch => {
    //console.log('what is spot id right now in thunk', spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadReviews(list));
        return list;
    }
}

export const getMyOwnReviewsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)

    if (response.ok) {
        const list = await response.json();
        dispatch(loadMyOwnReviews(list));
        return list;
    }
}

export const createReviewsThunk = ({ spotId, review, stars }) => async dispatch => {
    // console.log('what is spot id right now in thunk', spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({spotId, review, stars})
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
            action.list.Reviews.forEach(review => {
                reviewsObjState[review.id] = review;
            })
            return reviewsObjState
        };
        case LOAD_MY_REVS: {
            const newState = {};
            action.list.Reviews.forEach(review => {
                newState[review.id] = review;
            })
            return newState;
        };
        case CREATE_REV: {
            const newState = {...state};
            newState[action.list.id] = action.list;
            return newState;
        };
        case DELETE_REV: {
            const delState = { ...state };
            delete delState[action.reviewId]
            return delState;
        };
        default: return state
    }

}

export default reviewsReducer;
