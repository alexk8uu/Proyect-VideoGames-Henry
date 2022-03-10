import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink as Link } from 'react-router-dom';
import { createVideogame, getGenres, getPlataforms, getVideogames } from "../redux/actions/index.js"
import styles from "../css_modules/CreateVideogame.module.css"


function validate(input) {
    let error = {};
    if (!input.name) {
        error.name = "Name is required"
    } else if (!input.description) {
        error.description = "Description is required"
    } else if (!input.released) {
        error.released = "Released is required"
    } else if (input.genres.length < 0) {
        error.genres = "Genres is required"
    } else if (input.platforms.length < 0) {
        error.platforms = "Platforms is required"
    }
    return error;
}

// hardcode vars 

/* const genres = [{ name: "Action" }, { name: "Adventure" }, { name: "Shooter" }, { name: "RPG" }, { name: "Arcade" }, { name: "Rol" }]
const platforms = ["Xbox 360", "Play Station 4", "Play Station 5", "Pc", "Wii", "Nintendo"] */

export default function CreateVideogame() {

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const videogames = useSelector((state) => state.videogames);
    const allPlatforms = videogames.map((elem) => elem.platforms);
    let platformsSet = new Set(allPlatforms.flat(Infinity));
    let platforms = [...platformsSet]
    /* const platforms = useSelector((state) => state.platforms); */
    const history = useNavigate()
    const [errors, setErrors] = useState({});
    let [checkState, setCheckState] = useState({
        genres: new Array(genres.length).fill(false),
        platforms: new Array(platforms.length).fill(false)
    })

    let [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        img: "",
        platforms: [],
        genres: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
        console.log(platforms)
        console.log(checkState.platforms)
    }

    function handleSelectPlatforms(e, pos, elem) {
        if (!e.target.checked) {
            let elemDelete = e.target.value;
            setCheckState({
                ...checkState,
                platforms: checkState.platforms.filter(elem => elem !== elemDelete)
            })
            setInput({
                ...input,
                platforms: input.platforms.filter(elem => elem !== elemDelete)
            })
        } else {
            setCheckState({
                ...checkState,
                platforms: [...checkState.platforms, elem]
            })
            setInput({
                ...input,
                platforms: [...input.platforms, elem]
            })

        }
        console.log(input)
    }

    function handleSelectGenres(pos) {
        let genCheckState = checkState.genres.map((elem, index) => {
            if (index === pos) {
                return !elem
            }
            return elem;
        });
        setCheckState({ ...checkState, genres: genCheckState })
        var genArr = genCheckState.map((elem, index) => {
            if (elem === true) {
                return genres[index].name
            }
            return 0
        }).filter((elem) => typeof elem === "string")
        setInput({ ...input, genres: genArr })
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        console.log(input);
        dispatch(createVideogame(input));
        alert('Your videogame has been created succesfully')
        setInput({
            name: "",
            description: "",
            released: "",
            rating: 0,
            img: "",
            platforms: [],
            genres: []
        })
        history('/home');
    }

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getPlataforms());
        dispatch(getGenres());
    }, [dispatch])



    return (


        /*   <div className={styles.container}>
              <Link to='/home' >
                  <button
                      className={styles.button2}
                  >Back</button>
              </Link>
              <h1>Create your Videogame!</h1>
              <section>
                  <form onSubmit={(e) => handleSubmit(e)}>
                      <div className={styles.box}>
                          <h1 className={styles.inputDetail}>Name</h1>
                          <input
                              id="name"
                              type="text"
                              value={input.name}
                              name="name"
                              onChange={handleChange}
                          />
                          {
                              errors.name && (
                                  <p className={styles.error}>{errors.name}</p>
                              )
                          }
                      </div>
                      <div className={styles.box}>
                          <p className={styles.inputDetail} >Imagen</p>
                          <input
                              id="img"
                              type="text"
                              name="img"
                              value={input.img}
                              onChange={handleChange}
                          />
                      </div>
                      <div className={styles.box}>
                          <p className={styles.inputDetail}>Released</p>
                          <input
                              type="date"
                              name="released"
                              value={input.released}
                              onChange={handleChange}
                          />
                          {
                              errors.released && (
                                  <p className={styles.error}>{errors.released}</p>
                              )
                          }
                      </div>
                      <div className={styles.box}>
                          <p className={styles.inputDetail}>Rating</p>
                          <input
                              type="number"
                              name="rating"
                              value={input.rating}
                              min="0"
                              max="5"
                              onChange={handleChange}
                          />
                      </div>
                      <div className={styles.box}>
                          <p className={styles.button_text}>Description</p>
                          <textarea
                              id="description"
                              name="description"
                              value={input.description}
                              onChange={handleChange}
                          />
                          {
                              errors.description && (
                                  <p className={styles.error}>{errors.description}</p>
                              )
                          }
                      </div>
                      <div>
                          <label className={styles.genres_name}>Genres:</label>
                          <div className={styles.genres}>
                              {
                                  genres.map((elem, index) => (
                                      <div key={index} className={styles.genres_checkbox} >
                                          {elem.name}
                                          <input
                                              type="checkbox"
                                              name={elem.name}
                                              value={elem.name}
                                              className={styles.checkbox2}
                                              onChange={() => handleSelectGenres(index)}
                                          />
                                      </div>
                                  ))
                              }
                          </div>
                          <label className={styles.platforms_name}>Platforms:</label>
                          <div className={styles.platforms}>
                              {
                                  platforms.map((elem, index) => (
                                      <div key={index} className={styles.platforms_checkbox}>
                                          {elem}
                                          <input
                                              type="checkbox"
                                              name={elem}
                                              value={elem}
                                              onChange={(e) => handleSelectPlatforms(e, index, elem)}
                                          />
                                      </div>
                                  ))
                              }
                          </div>
                          <div>
                              {console.log(errors)}
                              <button
                                  disabled={errors.name || errors.description || errors.released}
                                  type="submit"
                                  className={errors.name || errors.description || errors.released ? `${styles.btn_disable}` : `${styles.btn}`}>
                                  Enter
                              </button>
                          </div>
                      </div>
                  </form>
              </section>
  
          </div> */

        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Create your Videogame!</h1>
            </div>
          <Link to='/home' >
                  <p className={styles.button}></p>
              </Link>
            <div className={styles.inputs}>
                <div className={styles.box}>
                    <h1 className={styles.inputDetail}>Name</h1>
                    <input
                        id="name"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {
                        errors.name && (
                            <p className={styles.error}>{errors.name}</p>
                        )
                    }
                </div>
                <div className={styles.box}>
                    <p className={styles.inputDetail} >Imagen</p>
                    <input
                        id="img"
                        type="text"
                        name="img"
                        value={input.img}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.box}>
                    <p className={styles.inputDetail}>Released</p>
                    <input
                        type="date"
                        name="released"
                        value={input.released}
                        onChange={handleChange}
                    />
                    {
                        errors.released && (
                            <p className={styles.error}>{errors.released}</p>
                        )
                    }
                </div>
                <div className={styles.box}>
                    <p className={styles.inputDetail}>Rating</p>
                    <input
                        type="number"
                        name="rating"
                        value={input.rating}
                        min="0"
                        max="5"
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.box}>
                    <p className={styles.button_text}>Description</p>
                    <textarea
                        id="description"
                        name="description"
                        value={input.description}
                        onChange={handleChange}
                    />
                    {
                        errors.description && (
                            <p className={styles.error}>{errors.description}</p>
                        )
                    }
                </div>
            </div>
            <div className={styles.genres_box}>
                <label className={styles.genres_name}>Genres:</label>
                <div className={styles.genres}>
                    {
                        genres.map((elem, index) => (
                            <div key={index} className={styles.genres_checkbox} >
                                {elem.name}
                                <input
                                    type="checkbox"
                                    name={elem.name}
                                    value={elem.name}
                                    className={styles.checkbox2}
                                    onChange={() => handleSelectGenres(index)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.platforms_box}>
                <label className={styles.platforms_name}>Platforms:</label>
                <div className={styles.platforms}>
                    {
                        platforms.map((elem, index) => (
                            <div key={index} className={styles.platforms_checkbox}>
                                {elem}
                                <input
                                    type="checkbox"
                                    name={elem}
                                    value={elem}
                                    onChange={(e) => handleSelectPlatforms(e, index, elem)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                {console.log(errors)}
                <button
                    disabled={errors.name || errors.description || errors.released}
                    type="submit"
                    className={errors.name || errors.description || errors.released ? `${styles.btn_disable}` : `${styles.btn}`}
                    onClick={(e) => handleSubmit(e)}>
                    Enter
                </button>
            </div>

        </div>

    )
}
