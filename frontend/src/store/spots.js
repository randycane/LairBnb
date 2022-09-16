

const LOAD = '/spots/LOAD';

const load = list => ({
    type: LOAD,
    list
})

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            //normalize my spots data
            const spotsObjState = {};
            action.list.forEach(spot => {
                spotsObjState[spot.id] = spot;
            })
            return spotsObjState;
    }
}

export default spotsReducer;
