import { Link } from "react-router-dom";
import "../../css/card-search.css"
export const CardSearch = (props) =>{
    const {data} = props;
    return(
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={data.id}>
        <div class=" col-12 col-sm-6 col-md-4 col-lg-3 card-search">
          <div class="image-card">
            <img className="img-card-search" src={`http://localhost:5000/products/${data.thumbnail[0]}`} alt={data.title} />
          </div>
          <div class="contenido">
            <Link to={`/details?id=${data.id}`} className="link">
              <h5 className="card-title">{data.title > 20 ? `${data.title.slice(0, 20)}...` : data.title}</h5>
            </Link>                     
            <Link to={`/details?id=${data.id}`} className="link link-info">
              <p className="card-text">${data.price}</p>
            </Link> 
            <Link to={`/details?id=${data.id}`} className="link link-info"> 
              <p class="btn-search"> Leer Más    </p>
            </Link>        
          </div>
        </div>
     
      </div>
    )
} 