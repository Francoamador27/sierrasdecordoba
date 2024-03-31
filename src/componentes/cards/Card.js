import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/card.css"
export const Card = (props)=>{
    const [hovered, setHovered] = useState(false);
    const handleHover = () => {
      setHovered(true);
    };
    const handleLeave = () => {
      setHovered(false);
    };
    const {data} = props;
 
    return (
        <>
         <div onMouseEnter={handleHover} onMouseLeave={handleLeave} className="card col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="imagen">
          <img className="img-card" src={`http://localhost:5000/products/${data.thumbnail[0]}`} alt={data.title} />
          </div>
          <div className={`left-curve ${hovered ? 'active-hover' : ''}`}></div>
          <div className={`right-curve ${hovered ? 'active-hover' : ''}`}></div>
          <div className="info text-center">
            <h5 className="card-title  title-card up-case">{data.title > 20 ? `${data.title.slice(0, 20)}...` : data.title}</h5>
            <p className=" card-text">{data.description}</p>
            <p className=" card-text">${data.price}</p>               
            <div className="text-center div-btn">
            <Link to={`/details?id=${data.id}`} className={` btn-card btn-primary ${hovered ? 'active-hover' : ''}`} >Ver Más</Link>
            </div>
          </div>
      </div>
        </>
    )
}