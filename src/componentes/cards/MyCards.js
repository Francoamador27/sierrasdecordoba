import { Link } from "react-router-dom";
import "../../css/card-search.css"
import Swal from "sweetalert2";
import { useState } from "react";
import { getMyProducts } from "../utils.js/fetchs/getMyproducts";
import { useDispatch } from "react-redux";
import { setMyProducts } from "../../redux/myproductsSlice";

export const MyCards =  (props) =>{
const [loading, setLoading] = useState(false);
const dispatch = useDispatch();
function handleDelete(data){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        fetchDelete(data);
      }
    });

  }
   function  fetchDelete (data) {
      const id = data.id;
      const endPoint = `http://localhost:5000/api/products/${id}`;
      fetch(endPoint, {
        method: 'DELETE',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json', 
        },})
        .then (async  response => {
          if (!response.ok) {
            setLoading(false);
            
            throw new Error(`Error de red: ${response.status}`);
          }
          const productsdeleted = await response.json()
          return productsdeleted; 
        })
        .then(async data => {
          const products = await getMyProducts();
          setLoading(false);
            dispatch(setMyProducts(products))
        })
        .catch(error => {
          setLoading(false);

          console.error('Error en la solicitud DELETE', error);
        });
           }
    const {data} = props;
    return(
  <div className={`col-12 col-sm-6 col-md-4 col-lg-3 ${loading ? 'deleting' : ''}`} key={data.id}>
        <div className=" col-12 col-sm-6 col-md-4 col-lg-3 card-search">
          <div className="image-card">
          <button className="delete-button" onClick={() => handleDelete(data)}><i class="bi bi-trash"></i></button>
            <img className="img-card-search" src={`http://localhost:5000/products/${data.thumbnail[0]}`} alt={data.title} />
          </div>
          <div className="contenido">
            <Link to={`/details?id=${data.id}`} className="link">
              <h5 className="card-title">{data.title > 20 ? `${data.title.slice(0, 20)}...` : data.title}</h5>
            </Link>                     
            <Link to={`/details?id=${data.id}`} className="link link-info">
              <p className="card-text">${data.price}</p>
            </Link> 
            <div className="btn-edit-watch">
            
            <Link to={`/details?id=${data.id}`} className="link ver-info link-info"> 
              <p className="btn-search"> Ver Publicacion    </p>
            </Link> 
            <Link to={`/editpost?id=${data.id}`} className="link link-info"> 
              <p className="btn-edit"> Editar    </p>
            </Link>        
            </div>       
          </div>
        </div>
     
      </div>
    )
} 