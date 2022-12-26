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

export const getMyOwnBooksThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)

    if (response.ok) {
        const list = await response.json();
        dispatch(loadMyOwnBooks(list));
        return list;
    }
}

//create booking by spot id thunk:
export const createBookingThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST"
    });

    if (response.ok) {
        dispatch(updateBooks(bookingId))
    }
}

//editing a booking:
export const editingBookingThunk = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT"
    });

    if (response.ok) {
        dispatch(createBOOKS(spotId))
    }
}

export const removeBookingThunk = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removeBooks(bookingId))

    }
    return response;
}

//reducer:

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOK: {
            const booksObjState = {};
            action.list.Bookings.forEach(book => {
                booksObjState[book.id] = book;
            })
            return reviewsObjState
        };
        case LOAD_MY_BOOKS: {
            const newState = {};
            action.list.Bookings.forEach(book => {
                newState[book.id] = book;
            })
            return newState;
        };
        case CREATE_BOOK: {
            const newState = {...state};
            newState[action.list.id] = action.list;
            return newState;
        };
        case DELETE_REV: {
            const delState = { ...state };
            delete delState[action.bookingId]
            return delState;
        };
        default: return state
    }

}

export default bookingsReducer;
