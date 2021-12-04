import React from 'react'
import styles from "../css_modules/VideogameText.module.css"
import { NavLink as Link } from 'react-router-dom';






export default function VidegameText() {

    const videogames = 'VIDEOGAMES';
    const letras = videogames.split("");
    
/* 
    function handleMouseEnter() {
        let cuenta = 0;
        const intervalo = setInterval(() => {
            if(cuenta < letras.children) {
                letras.children[cuenta].classlist.add('animacion')
                cuenta += 1 
            } else {
                clearInterval(intervalo)
            }
        }, 30 )
    } */


    return (
        <main>
            <a className={styles.logotipo}>
                <div className={styles.texto_animado}>
                    {
                        letras.map(letra => {
                            return <div className={styles.animacion}>
                                <span>{letra}</span>
                                <span className={styles.segunda_linea}>{letra}</span>
                            </div>
                        })
                    }
                </div>
                <Link to='/home' className={styles.link}>
                <p className={styles.subtitulo}>INGRESAR</p>
                </Link>
            </a>
        </main>

    )
}


/* class TextoAnimado {
	constructor(id, objetivo){
		this.texto = document.getElementById(id);
		this.objetivo = document.getElementById(objetivo);
		this.letras = this.texto.innerText.split("");
		
		this.texto.innerText = '';

		this.letras.forEach((letra) => {
			let caracter = letra === ' ' ? '&nbsp;' : letra;

			this.texto.innerHTML = this.texto.innerHTML + `
				<div>
					<span>${caracter}</span>
					<span class="segunda-linea">${caracter}</span>
				</div>
			`;
		});

		this.objetivo.addEventListener('mouseenter', () => {
			let cuenta = 0;

			const intervalo = setInterval(() => {
				if(cuenta < this.texto.children.length){
					this.texto.children[cuenta].classList.add('animacion');
					cuenta += 1;
				} else {
					clearInterval(intervalo);
				}
			}, 30);
		});

		this.objetivo.addEventListener('mouseleave', () => {
			let cuenta = 0;

			const intervalo = setInterval(() => {
				if(cuenta < this.texto.children.length){
					this.texto.children[cuenta].classList.remove('animacion');
					cuenta += 1;
				} else {
					clearInterval(intervalo);
				}
			}, 30);
		});
		
	}
}

new TextoAnimado('logo', 'logotipo'); */