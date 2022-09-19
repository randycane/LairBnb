
import { csrfFetch } from './csrf';

const LOAD = '/spots/LOAD';

const load = list => {
    return {
        type: LOAD,
        list
    }

}


// thunk:
export const getSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const list = await response.json();
        console.log('get spots thunk', list.Spots)
        dispatch(load(list.Spots));
        return list;
    }
}

const initialState = {

};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            //normalize my spots data
            const spotsObjState = {...state};
            console.log('the action for spot reducer', action.list);
            action.list.forEach(spot => {
                spotsObjState[spot.id] = spot;
            })
            console.log('the state to return', spotsObjState)
            return spotsObjState;
        };
        default: return state
    }

}

export default spotsReducer;
