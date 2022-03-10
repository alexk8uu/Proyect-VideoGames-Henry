import axios from 'axios';
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const CREATED_VIDEOGAME = "CREATED_VIDEOGAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const ORDER_BY_ALPHA = "ORDER_BY_ALPHA";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const URL_VIDEOGAMES = "/videogames";
export const URL_SEARCH_VIDEOGAME = "/videogames?name=";
export const URL_DETAILS = "/videogame"
export const URL_GENRES = "/genre"
export const URL_CREATE_VIDEOGAME = "/videogame"
export const URL_DBGAMES = "/db/videogames"
export const RESET = "RESET"


export function getDbGames() {
    return async function (dispatch) {
        try {
            const dbgames = await axios.get(URL_DBGAMES)
            return dispatch({
                type: URL_DBGAMES,
                payload: dbgames.data
            })
        } catch (error) {
            console.log("Error", error)
        }
    }
}

export function getVideogames() {
    return async function (dispatch) {
        try {
            const games = await axios.get(URL_VIDEOGAMES)
            return dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: games.data
            })
        } catch (error) {
            console.log("Error", error)
        }
    }
}
/* 
export function getVideogames() {
    return function (dispatch) {
        axios.get(URL_VIDEOGAMES)
        .then(games => {
            return dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: games.data
            })
        }).catch(error => console.log("Error", error))
    }
}
 */



export function createVideogame(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post(URL_CREATE_VIDEOGAME, payload)
            return dispatch({
                type: CREATED_VIDEOGAME,
                payload: json.data
            })
        } catch (error) {
            console.log("Error", error)
        }
    }
}

export function getGenres() {
    return async function (dispatch) {
        try {
            const genres = await axios.get(URL_GENRES)
            return dispatch({
                type: GET_GENRES,
                payload: genres.data
            })
        } catch (error) {
            console.log("Error", error)
        }
    }
}

export function getPlataforms() {
    return async function (dispatch) {
        try {
            const json = await axios.get(URL_VIDEOGAMES)
            return dispatch({
                type: GET_PLATFORMS,
                payload: json.data
            })
        } catch (error) {
            console.log("Error", error)
        }
    }
}



export function getDetailsByID(id) {
    return async function (dispatch) {
        try {
            const details = await axios.get(`${URL_DETAILS}/${id}`)
            return dispatch({
                type: GET_DETAILS,
                payload: details.data
            })
        } catch (error) {
            console.log("Error", error)
        }
    }
}

export function searchGameByName(payload) {
    return async function (dispatch) {
        try {
            const games = await axios.get(`${URL_SEARCH_VIDEOGAME}${payload}`);
            return dispatch({
                type: URL_SEARCH_VIDEOGAME,
                payload: games.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByRating(payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export function orderByAlpha(payload) {
    return {
        type: ORDER_BY_ALPHA,
        payload
    }
}

export function filterByGenres(payload) {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}

export function filterByOrigen(payload) {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function reset() {
    return {
        type: RESET,
    };
}

/* export function getVideogames() {
    return async function (dispatch) {
        const games = await axios.get(URL_VIDEOGAMES,{})
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: games.data
        })
    }
}  */
/* 
export function getVideogames() {
    return function (dispatch) {
      axios.get(`/videogames`).then((games) => {
        dispatch({ type: "GET_ALL_VIDEOGAMES", payload: games.data });
      });
    };
  } */
