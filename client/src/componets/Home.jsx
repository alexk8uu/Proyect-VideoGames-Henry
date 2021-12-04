import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CardList from "./CardList.jsx"
import {
    getVideogames,
    orderByRating,
    reset,
    filterByOrigen,
    getGenres,
    filterByGenres,
    orderByAlpha,
    getPlataforms
} from "../redux/actions/index.js";
import Paginado from './Paginado.jsx';
import SearchBar from './SearchBar.jsx';
import styles from '../css_modules/Home.module.css';
/* import VidegameText from './VidegameText.jsx' */
import { NavLink as Link } from 'react-router-dom';


//pedir los personajes al back
//escucho y mapeo el estado de los videogames y por cada uno mapeo una Cards
export default function Home() {

    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres)
    const data = useSelector((state) => state.data)
    const [filter, setFilter] = useState("");


    /* ---- select from DB- API */

    let result = videogames;
    if (data === "Created") {
        result = videogames.filter(e => typeof (e.id) === "string")
    } else if (data === 'Api') {
        result = videogames.filter(e => typeof (e.id) === "number")
    }


    /* --------- paginado ----------  */

    const [currentPage, setCurrentPage] = useState(1);
    const [VideogamesForPage] = useState(15)
    const indexOfLast = currentPage * VideogamesForPage;
    const indexOfFirst = indexOfLast - VideogamesForPage;
    const currentVideogames = result.slice(indexOfFirst, indexOfLast)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    /* ---------------------------------- */


    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
        dispatch(getPlataforms());
    }, [dispatch])


    /* -----------FILTRADOS---------------------- */

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames())
    }

    function reiniciar() {
        dispatch(reset())
    }

    function handleOrderRanking(e) {
        e.preventDefault()
        setFilter(filter + e.target.value)
        dispatch(orderByRating(e.target.value))
    }

    function handleFilterByOrder(e) {
        e.preventDefault();
        setFilter(filter + e.target.value)
        dispatch(filterByOrigen(e.target.value))
    }

    function handleFilterByGenres(e) {
        reiniciar();
        dispatch(filterByGenres(e.target.value))
    }

    function handleOrderAlpha(e) {
        e.preventDefault()
        setFilter(filter + e.target.value)
        dispatch(orderByAlpha(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div className={styles.container}>
            <h1 data-text="VIDEOGAMES..."> VIDEOGAMES... </h1>

            <div className={styles.nav}>
                <div>
                    <button onClick={e => { handleClick(e) }}> Volver a cargar los videogames </button>
                </div>
                <select onChange={e => handleOrderAlpha(e)}>
                    <option value='All'>Ordenar A-Z</option>
                    <option value='Asc'>Ascendente</option>
                    <option value='Desc'>Descendente</option>
                </select>
                <select onChange={e => handleOrderRanking(e)}>
                    <option value='null'>Select Rating </option>
                    <option value='RtgASC'>Rating ↑ </option>
                    <option value='RtgDESC'>Rating ↓ </option>
                </select>
                <select onChange={e => handleFilterByOrder(e)}>
                    <option value={'All'}>Todos</option>
                    <option value={'Created'}>Creados</option>
                    <option value={'Api'}>Existentes</option>
                </select>
                <select onChange={e => handleFilterByGenres(e)}>
                    <option value='All'>Generos</option>
                    {
                        genres?.map(elem => {
                            return <option key={elem.id} value={elem.name}>{elem.name}</option>
                        })
                    }
                </select>
                <div>
                    <Link to='/create'><button>CREATE VIDEOGAME</button></Link>
                </div>
                <SearchBar />
                <Paginado
                    VideogamesForPage={VideogamesForPage}
                    videogames={videogames.length}
                    paginado={paginado}
                />
                <div>
                    <CardList games={currentVideogames} />
                </div>
            </div>
        </div>
    )
}