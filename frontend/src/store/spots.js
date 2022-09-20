
import { csrfFetch } from './csrf';

//action creators:
const LOAD = '/spots/LOAD';
const CREATE = '/spots/CREATE';
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

const remove =  id => {
    return {
        DELETE,
        id
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
}

export const removeSpotsThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const delSpot = await response.json()
        dispatch(remove(delSpot, id))
        return response;
    }
}

const initialState = {

};

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
        case DELETE: {
            const delState = {...state};
            delete delState[action.id]
            return delState;
            }
        default: return state
    }

}

export default spotsReducer;
