import React from "react";
import { Link } from 'react-router-dom';
import styles from '../css_modules/LandingPage.module.css'

export default function LandingPage() {
    return (
        <div >
            <div className={styles.box}> VIDEOGAME NOT FOUND</div>
            <img src="https://wallpaperslinks.com/wp-content/uploads/2020/04/neon_pacman.jpg" alt="VIDEOGAME NOT FOUND" className={styles.img}/>
        </div>
    ) 
}
