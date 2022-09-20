
import { csrfFetch } from './csrf';

//action creators:
const LOAD = '/spots/LOAD';
const CREATE = '/spots/CREATE';
const UPDATE = '/spots/UPDATE';
const DELETE = '/spots/DELETE';

const load = list => {
    return {
        type: LOAD,
        list
    }

}

const create = list => {
    return {
        type: CREATE,
        list
    }
}

const update = spotId => {
    return {
        type: UPDATE,
        spotId
    }
}

const remove =  spotId => {
    return {
        type: DELETE,
        spotId
    }
}


// thunks:
export const getSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const list = await response.json();
        console.log('get spots thunk', list.Spots)
        dispatch(load(list.Spots));
        return list;
    }
}

export const createSpotsThunk = (list) => async dispatch => {
    const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
      });

      if (response.ok) {
        const newSpot = await response.json()
        dispatch(create(newSpot))
        return newSpot;
      }
    return response;
}

export const editSpotsThunk = (payload, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const edittedSpot = await response.json()
        dispatch(update(edittedSpot));

    }
    return response;
}

export const removeSpotsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(remove(spotId))

    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            //cases for all my spots data
            const spotsObjState = {};
            console.log('the action for spot reducer', action.list);
            action.list.forEach(spot => {
                spotsObjState[spot.id] = spot;
            })
            console.log('the state to return', spotsObjState)
            return spotsObjState;
        };
        case CREATE: {
            const newState = {};
            action.list.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState;
        };
        case UPDATE: {
            return {...state}
            }
        case DELETE: {
            const delState = {...state};
            delete delState[action.spotId]
            return delState;
            }
        default: return state
    }

}

export default spotsReducer;
