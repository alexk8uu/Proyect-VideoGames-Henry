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
  getPlataforms,
  getDbGames
} from "../redux/actions/index.js";
import Paginado from './Paginado.jsx';
import SearchBar from './SearchBar.jsx';
import LandingPage from './LandingPage.jsx';
import styles from '../css_modules/Home.module.css';
import { NavLink as Link } from 'react-router-dom';
import { IoIosRefresh } from "react-icons/io";
import Particles from "react-tsparticles";

//pedir los personajes al back
//escucho y mapeo el estado de los videogames y por cada uno mapeo una Cards
export default function Home() {

  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames)
  const genres = useSelector((state) => state.genres)
  const data = useSelector((state) => state.data)
  const [filter, setFilter] = useState("");
  const dbgames = useSelector((state) => state.dbgames);


  /* ---- select from DB- API */

  let result = videogames;
  if (data === "Created") {
    result = dbgames
  } else if (data === 'Api') {
    result = videogames.filter(e => typeof (e.id) === "number")
  }




  console.log(videogames)
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
    dispatch(getDbGames());
  }, [dispatch])


  /* -----------FILTRADOS---------------------- */

  function handleDB(e) {
    e.preventDefault();
    dispatch(getDbGames())
  }


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
  /* -----------PARTICULAS---------------------- */
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (

    <div className={styles.container}>
      <h1 data-text="VIDEOGAMES..."> VIDEOGAMES... </h1>

      <div className={styles.nav}>
        <div>
          <button className={styles.btn_reload} onClick={e => { handleClick(e) }}><IoIosRefresh /></button>
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
          <button onClick={e => handleDB(e)} className={styles.btn_database}>DATABASE</button>
          <Link to='/create' ><button className={styles.btn_create}>CREATE VIDEOGAME</button></Link>
          <SearchBar />
        </div>
        <Paginado
          VideogamesForPage={VideogamesForPage}
          videogames={videogames.length}
          paginado={paginado}
          className={styles.paginado}
        />
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 60,
            interactivity: {
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 }
              }
            },
            particles: {
              color: { value: "#2EE59D" },
              move: {
                direction: "none",
                enable: true,
                outModes: "out",
                random: false,
                speed: 1,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  area: 400
                },
                value: 80
              },
              opacity: {

                value: {
                  min: 0,
                  max: 0.5
                }
              },
              shape: {
                type: "edge"
              },
              size: {
                value: { min: 1, max: 5 }
              }
            }
          }}
        />
        <div>

          {
            videogames === "VideoGame not found" ? <LandingPage /> : <CardList games={currentVideogames} />
          }

        </div>
      </div>
    </div>
  )
}

/* 
const styles2 = StyleSheet.create({
  paginado : {
    margin: 120,
  }
})
 */