import {  useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Loading } from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productsSlice";
import { Card } from "./cards/Card";
function Listado() {
  const dispatch = useDispatch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let page = queryParams.get('page');
  if (!page) {
    page = '1';
  }
  const productsList = useSelector((state)=> state.products);
  useEffect(() => {
    const fetchData = async () => {
      const endPoint = 'http://localhost:5000/api/products?limit=10';
      try {
        const response = await fetch(endPoint, {
          method: 'GET',
          credentials: 'include', // Asegúrate de incluir las credenciales
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const apiData = await response.json();
        dispatch(setProducts(apiData.data.products))
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error en la API',
        });
      }
    };
    fetchData();
  }, [dispatch, page]);


  return (
    <>
  {(!productsList || productsList.length === 0) && 
  <Loading />
}
      <div className="row">
        {productsList.map((oneMovie) => (
          <>
     <Card data={oneMovie}/>
      </>
        ))}
      </div>

    </>
  );
}

export default Listado;