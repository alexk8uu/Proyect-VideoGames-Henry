import Card from "./Card";


export default function CardList({games}) {
    return (
        <div>
            <div>
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
                        />
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