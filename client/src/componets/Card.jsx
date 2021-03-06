import React from 'react';
import styles from '../css_modules/Card.module.css'
import { NavLink as Link } from 'react-router-dom';

export default function Card({ name, img, genres, id, rating, platforms }) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.image_container}>
                        <img src={img ? img : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"} alt={"Videogame"} />
                    </div>
                    <div className={styles.text}>
                        <h2>{name}</h2>
                        <h4> {genres} </h4>
                        <p> {platforms}</p>
                        <p> Rating: {rating}</p>
                        <Link to={`/videogame/${id}`}>
                            <button className={styles.button}>
                                View Game
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
