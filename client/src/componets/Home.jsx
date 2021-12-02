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
    orderByAlpha
} from "../redux/actions/index.js";
import Paginado from './Paginado.jsx';
/* import { Link } from 'react-router-dom'; */


//pedir los personajes al back
//escucho y mapeo el estado de los videogames y por cada uno mapeo una Cards
export default function Home() {

    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [VideogamesForPage] = useState(15)
    const indexOfLast = currentPage * VideogamesForPage;
    const indexOfFirst = indexOfLast - VideogamesForPage;
    const currentVideogames = videogames.slice(indexOfFirst, indexOfLast)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }



    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames())
    }

    function reiniciar() {
        dispatch(reset())
    }

    function handleOrderRanking(e) {
        reiniciar();
        dispatch(orderByRating(e.target.value))
    }

    function handleFilterByOrder(e) {
        reiniciar();
        dispatch(filterByOrigen(e.target.value))
    }

    function handleFilterByGenres(e) {
        reiniciar();
        dispatch(filterByGenres(e.target.value))
    }
    
    function handleOrderAlpha(e) {
        reiniciar();
        dispatch(orderByAlpha(e.target.value))
    }

    return (
        <div>
            <h1> VIDEOGAMES </h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar los videogames
            </button>
            <div>
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
                           return  <option key={elem.id} value={elem.name}>{elem.name}</option>
                        })
                    }
                </select>
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