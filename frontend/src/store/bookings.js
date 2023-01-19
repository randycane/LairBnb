import { csrfFetch } from "./csrf";

//Action creators
const LOAD_BOOK = "/bookings/LOAD";
const CREATE_BOOK = "/bookings/CREATE";
const UPDATE_BOOK = "/bookings/UPDATE";
const DELETE_BOOK = "/bookings/DELETE";

const LOAD_MY_BOOKS = "/bookings/LOAD_BY_USER";

//actual actions
const loadBooks = (booking) => ({
  type: LOAD_BOOK,
  booking,
});

const loadMyOwnBooks = (booking) => ({
  type: LOAD_MY_BOOKS,
  booking,
});

const createBooking = (booking) => {
  return {
    type: CREATE_BOOK,
    booking,
  };
};

// edit booking action
const updateBooks = (booking) => {
  return {
    type: UPDATE_BOOK,
    booking,
  };
};

const removeBooks = (booking) => {
  return {
    type: DELETE_BOOK,
    booking,
  };
};

//thunks:

//get bookings by the spot:
export const getSpotsBooksThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    let list = await response.json();
    list = list.booking;
    dispatch(loadBooks(list));
    // return list;
  }
    return response;
};

// get current user bookings:
export const getMyOwnBooksThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);

  if (response.ok) {
    const list = await response.json();
    dispatch(loadMyOwnBooks(list));
    return list;
  }
};

//create booking thunk:
export const createBookingThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.spotId}`, {
      method: "POST",
      headers: {"Content-Type": "application.json"},
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const aNewBooking = await response.json();
    dispatch(createBooking(aNewBooking));
    // return aNewBooking;
  }
  return response;
};

//editing a booking:
export const editingBookingThunk = (booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const changeBooking = await response.json();
    dispatch(updateBooks(changeBooking));
    return changeBooking;
  }
  return response;
};

export const removeBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeBooks(bookingId));
  }
  return response;
};

//reducer:

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    //   case LOAD_BOOK: {
    //     const booksObjState = {};
    //     action.booking.forEach((booking) => (booksObjState[booking.id] = booking));
    //     let bookings = { ...booksObjState };
    //     return bookings;
    //   }
    case LOAD_MY_BOOKS: {
      const newState = {};
      action.booking.forEach((book) => {
        newState[book.id] = book;
      });
      return newState;
    }
    case CREATE_BOOK: {
      const newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    }
    case UPDATE_BOOK: {
      return {
        ...state,
        [action.booking.id]: action.booking,
      };
    }
    case DELETE_BOOK: {
      const delState = { ...state };
      delete delState[action.bookingId];
      return delState;
    }
    default:
      return state;
  }
};

export default bookingsReducer;
