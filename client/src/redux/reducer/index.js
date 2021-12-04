import {
    GET_ALL_VIDEOGAMES,
    ORDER_BY_RATING,
    GET_DETAILS,
    RESET,
    FILTER_BY_ORIGIN,
    GET_GENRES,
    FILTER_BY_GENRES,
    ORDER_BY_ALPHA,
    URL_SEARCH_VIDEOGAME,
    CREATED_VIDEOGAME,
    GET_PLATFORMS
} from "../actions/index.js"

import {
    orderRating,
    orderByOrigen,
    orderByGenres,
    orderAlpha,
    obtainPlatforms,
} from "../utils/index.js"

const initialState = {
    videogames: [],
    genres: [],
    details: [],
    data: "",
    reset: [],
    platforms: [],
};

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                reset: action.payload
            }
        case URL_SEARCH_VIDEOGAME:
            return {
                ...state,
                videogames: action.payload   
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: obtainPlatforms(state.videogames)
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case FILTER_BY_GENRES:
                if(action.payload === 'All') return {
                    ...state,
                    videogames: state.reset
                }
            return {
                ...state,
                videogames: orderByGenres(action.payload, state.videogames)
            }

        case ORDER_BY_RATING:
            if (action.payload === 'null') return {
                ...state,
                videogames: state.reset
            }
            return {
                ...state,
                videogames: orderRating(action.payload, state.videogames)
            }
        case ORDER_BY_ALPHA:
            if (action.payload === 'All') return {
                ...state,
                videogames: state.reset
            }
            return {
                ...state,
                videogames: orderAlpha( action.payload, state.videogames)
            }
        case FILTER_BY_ORIGIN:
            return {
                ...state,
                data: action.payload
            } 
        case CREATED_VIDEOGAME:
            return {
                ...state
            }   
        case RESET:
            return {
                ...state,
                videogames: state.reset
            }
        default:
            return state;
    }
}

export default rootReducer;