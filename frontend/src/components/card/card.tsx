import "./card.css";

interface CardProps {
    price: number,
    title: string,
    image: string,
    children: React.ReactNode
}

export function Card({ price, image, title, children } : CardProps){
    return(
        <div className="card">
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Valor: </b> R${price}</p>
            {children} {}
        </div>
    )
}