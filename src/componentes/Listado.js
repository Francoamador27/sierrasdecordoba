import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productsSlice";
import { Card } from "./cards/Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { getAllProducts } from "./utils.js/fetchs/getAllProducts";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

function Listado(props) {
  let params = {};
  const [products, setProducts] = useState([]);
  if (props) {
    if (props.category) {
      params.category = props.category;
    }
    if (props.departamento) {
      params.departamento = props.departamento;
    }
    if (props.ciudad) {
      params.ciudad = props.ciudad;
    }
    if (props.order) {
      params.order = props.order;
    }
  }
  const dispatch = useDispatch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let page = queryParams.get('page');
  if (!page) {
    page = '1';
  }

  useEffect(() => {
    const fetchAll = async () => {
      try {
        params.page = page;
        const data = await getAllProducts(params);
        // props.onProductsLoaded(data.length > 0);

        setProducts(data.products);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error en la API',
        });
      }
    };
    fetchAll();
  }, []);
  return (
    <>
      {(!products || products.length === 0) &&
        <Loading />
      }


      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}

        loop="true"
        breakpoints={{
          // Cuando el ancho de la pantalla sea igual o mayor a 768px, muestra 2 slides por vista
          400: {
            slidesPerView: 1,

          },
          500: {
            slidesPerView: 2
          },
          850: {
            slidesPerView: 4
          },
          // Cuando el ancho de la pantalla sea igual o mayor a 1024px, muestra 3 slides por vista
          1024: {
            slidesPerView: 4,
            
          }
        }}
        spaceBetween={50}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          stopOnLastSlide: false,

        }}

      >

        <div className="row">
          {products.map((oneMovie, index) => (
            <SwiperSlide key={index} className="card-home">
              <Card data={oneMovie} />

            </SwiperSlide>
          ))}
        </div>
      </Swiper>


    </>
  );
}

export default Listado;