import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productsSlice";
import { CardSearch } from "./cards/CardsSearch";
function ListadoCategory() {
  const dispatch = useDispatch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [propiedades, setPropiedades] = useState([]);
  let page = queryParams.get('page');
  let category = queryParams.get('category');
  if (!page) {
    page = '1';
  }
  const productsList = useSelector((state)=> state.products);
  useEffect(() => {
    const fetchData = async () => {
      setPropiedades([])
      const endPoint = `http://localhost:5000/api/products?limit=10&category=${category}`;
      try {
        const response = await fetch(endPoint, {
          method: 'GET',
          credentials: 'include', // Asegúrate de incluir las credenciales
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const apiData = await response.json();
        setPropiedades(apiData.data.products)

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
  }, [category,page]);

  useEffect(() => {
    const fetchSession = async () => {
      const endPointSession = 'http://localhost:5000/api/sessions/show';

      try {
        const response = await fetch(endPointSession, {
          method: 'GET',
          credentials: 'include', // Asegúrate de incluir las credenciales
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const apiSession = await response.json();

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error en la API',
        });
      }
    };

    fetchSession();
  }, []);
  return (
    <>
  {(!propiedades || propiedades.length === 0) && 
  <Loading />
}
      <div className="row">
        {propiedades.map((prop) => (
               <CardSearch data={prop} />

        ))}
      </div>
    </>
  );
}

export default ListadoCategory;