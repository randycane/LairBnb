import { csrfFetch } from './csrf';

//Action creators
const LOAD_BOOK = '/bookings/LOAD';
const CREATE_BOOK = '/bookings/CREATE';
const UPDATE_BOOK = '/bookings/UPDATE';
const DELETE_BOOK = '/bookings/DELETE';

const LOAD_MY_BOOKS = '/bookings/LOAD_BY_USER';

const loadBooks = list => ({
    type: LOAD_BOOK,
    list
})

const loadMyOwnBooks = list => ({
    type: LOAD_MY_BOOKS,
    list
})

const createBOOKS = list => {
    return {
        type: CREATE_BOOK,
        list
    }
}

// to do:
const updateBooks = payload => {
    return {
        type: UPDATE_BOOK,
        payload
    }
}

const removeBooks =  payload => {
    return {
        type: DELETE_BOOK,
        payload
    }
}


//thunks:
export const getSpotsBooksThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadBooks(list));
        return list;
    }
}
