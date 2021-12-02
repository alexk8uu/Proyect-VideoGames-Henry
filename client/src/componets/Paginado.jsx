import React from "react";  
import styles from "../css_modules/Paginado.module.css"

export default function Paginado ({VideogamesForPage , videogames ,paginado }) {
    const pageNumbers = [];
    
    for (let i = 0; i <= Math.ceil(videogames/VideogamesForPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav className={styles.paginado}>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li className='number' key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}