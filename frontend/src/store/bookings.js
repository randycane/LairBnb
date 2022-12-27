import { csrfFetch } from './csrf';

//Action creators
const LOAD_BOOK = '/bookings/LOAD';
const CREATE_BOOK = '/bookings/CREATE';
const UPDATE_BOOK = '/bookings/UPDATE';
const DELETE_BOOK = '/bookings/DELETE';

const LOAD_MY_BOOKS = '/bookings/LOAD_BY_USER';


//actual actions
const loadBooks = list => ({
    type: LOAD_BOOK,
    list
})

const loadMyOwnBooks = list => ({
    type: LOAD_MY_BOOKS,
    list
})

const createBooking = list => {
    return {
        type: CREATE_BOOK,
        list
    }
}

// edit booking action
const updateBooks = booking => {
    return {
        type: UPDATE_BOOK,
        booking
    }
}

const removeBooks = payload => {
    return {
        type: DELETE_BOOK,
        payload
    }
}


//thunks:

//get bookings by the spot:
export const getSpotsBooksThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadBooks(list));
        return list;
    }
}

// get current user bookings:
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
        method: "POST",

    });

    if (response.ok) {
        const aNewBooking = await response.json();
        dispatch(createBooking(aNewBooking))
        return aNewBooking;
    }
    return response;
}

//editing a booking:
export const editingBookingThunk = (booking) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const changeBooking = await response.json();
        dispatch(updateBooks(changeBooking))
        return changeBooking;
    }
    return response;
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
            return booksObjState;
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
        case UPDATE_BOOK: {
            return {
                ...state,
                [action.booking.id]: action.booking,
            };
        }
        case DELETE_REV: {
            const delState = { ...state };
            delete delState[action.bookingId]
            return delState;
        };
        default: return state
    }

}

export default bookingsReducer;
