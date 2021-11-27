import {
    GET_ALL_VIDEOGAMES,
} from "../actions/index.js"

const initialState = {
    videogames : [],
    genres : [],
    dbVidegames : []
};

export default function rootReducer(state = initialState, action ) {
    if(action.type === GET_ALL_VIDEOGAMES) {
        console.log(action.payload)
         return {
                ...state,
                videogames: action.payload
            }
        }
    return state;
    }