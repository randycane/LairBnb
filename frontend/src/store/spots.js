
import { csrfFetch } from './csrf';

//action creators:
const LOAD = '/spots/LOAD';
const CREATE = '/spots/CREATE';
const UPDATE = '/spots/UPDATE';
const DELETE = '/spots/DELETE';

const LOAD_BY_SPOTID = '/spots/LOAD_BY_SPOTID';
const LOAD_OWN_SPOTS = '/spots/LOAD_OWN_SPOTS';

const load = list => {
    return {
        type: LOAD,
        list
    }

}

const loadBySpotId = spotId => {
    return {
        type: LOAD_BY_SPOTID,
        spotId
    }
}

const loadMyOwnSpots = list => {
    return {
        type: LOAD_OWN_SPOTS,
        list
    }
}
const create = list => {
    return {
        type: CREATE,
        list
    }
}

const update = payload => {
    return {
        type: UPDATE,
        payload
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
        //console.log('get spots thunk', list.Spots)
        dispatch(load(list.Spots));
        return list;
    }
}

export const getSpotsByTheirId = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const payload = await response.json();

        dispatch(loadBySpotId(payload));
        //console.log('spot to be returned as payload', payload)
        return payload;
    }
}

export const getCurrentUserSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`,
        {
        method: "GET"
        })

    if (response.ok) {
        const list = await response.json();
        dispatch(loadMyOwnSpots(list))
        return list;
    }
}

export const createSpotsThunk = (list) => async dispatch => {
    //console.log('this is my new spot info', list)
    const response = await csrfFetch('/api/spots', {
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

        // need this logic to reload by its spotId
        dispatch(getSpotsByTheirId(spotId));

    }
    return response;
}

export const addImgThunk = ( imgUrl, spotId ) => async dispatch => {
    console.log('what are my parameters of img thunk', imgUrl, spotId);

    const response = await csrfFetch(`/api/spots/${spotId}/images`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(imgUrl)
    })
    //console.log('fetch img thunk:',response)
    if (response.ok) {
        dispatch(loadBySpotId(spotId));
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
            //console.log('the action for spot reducer', action.list);
            action.list.forEach(spot => {
                spotsObjState[spot.id] = spot;
            })
            //console.log('the state to return', spotsObjState)
            return spotsObjState;
        };
        case LOAD_BY_SPOTID: {
            const newState = { ...state }
            //console.log('the action to payload for spot id CASE', action)
            newState[action.spotId.id] = action.spotId;
            return newState;
        };
        case LOAD_OWN_SPOTS: {
            let newState = {};
            action.list.Spots.forEach((spot) => newState[spot.id] = spot);
            let ownedSpots = { ...newState };
            return ownedSpots;
        };
        case CREATE: {
            const newState = { ...state };
                newState[action.list.id] = action.list;
            return newState;

        };
        case UPDATE: {
            const newState = { ...state }
            //console.log('to edit a spot reduced action', action.payload)
            newState[action.payload.id] = action.payload;
            return newState;

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
