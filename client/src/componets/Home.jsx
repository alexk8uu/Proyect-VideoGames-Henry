import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CardList from "./CardList.jsx"
import { getVideogames } from "../redux/actions/index.js";
import Paginado from './Paginado.jsx';
/* import { Link } from 'react-router-dom'; */


//pedir los personajes al back
//escucho y mapeo el estado de los videogames y por cada uno mapeo una Cards
export default function Home() {

    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogames)
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
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames())
    }

    return (
        <div>
            <h1> VIDEOGAMES </h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar los videogames
            </button>
            <div>
                <select>
                    <option value='Asc'>ASCENDENTE</option>
                    <option value='Desc'>DESCENDENTE</option>
                </select>
                <select>
                    <option value='RtgASC'>Rating ↑ </option>
                    <option value='RtgDESC'>Rating ↓ </option>
                </select>
                <select>
                    <option value={'All'}>Todos</option>
                    <option value={'Created'}>Creados</option>
                    <option value={'Api'}>Existentes</option>
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