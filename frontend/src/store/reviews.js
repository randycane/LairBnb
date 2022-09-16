


const LOAD = '/reviews/LOAD';

const load = list => ({
    type: LOAD,
    list
})

export const getReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            //normalize my reviews data
            const reviewsObjState = {};
            action.list.forEach(review => {
                reviewsObjState[review.id] = review;
            })
            return reviewsObjState;
    }
}

export default reviewsReducer;
