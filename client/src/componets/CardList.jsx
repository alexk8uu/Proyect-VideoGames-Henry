import Card from "./Card";
import styles from '../css_modules/CardList.module.css'


export default function CardList({games}) {
    return (
        <div>
            <div className={styles.grid}>
            {
            games.map((e ,index) => {
                if(e.name !== "VideoGame not found") {
                    return (
                        <Card 
                        key={index}
                        name={e.name}
                        img={e.img}
                        id={e.id}
                        rating={e.rating}
                        genres={e.genres.map((elem) => elem.name).join(" / ")}
                        platforms={e.platforms.map((elem) => elem).join(" / ")}
                        price={e.price}/>
                    );
                } else {
                   return (
                    <div>
                        <h1>GAME NOT FOUND</h1>
                    </div>
                   )     
                }
            })
            }

            </div>
        </div>
    )
}