import React from 'react';
import styles from '../css_modules/Card.module.css'
import { NavLink as Link } from 'react-router-dom';

export default function Card({ name, img, genres, id, rating }) {
    return (
        <div className={styles.container}>
        <div className={styles.card}>
                <img src={img ? img : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"} alt={"Videogame"} />
                    <h2>{name}</h2>
                    <p> { genres } </p>
                    <p> Rating: {rating}</p>
                <Link to={`/videogame/${id}`}>
                <button>
                    <a>View Game</a>
                </button>
                </Link>
                </div>
            </div>
    
    )
}
