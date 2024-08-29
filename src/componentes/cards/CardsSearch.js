import { Link } from "react-router-dom";
import "../../css/card-search.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { url } from "../utils.js/endpoint/endpoint";
export const CardSearch = (props) => {
  const { data } = props;
  return (
    <div className="card-search" key={data.id}>
          <Swiper
            pagination={{
              type: 'progressbar',
            }}
            navigation={true}
            modules={[Navigation , Pagination]}
            className="mySwiper galery-search"
            spaceBetween={50}
            slidesPerView={1}
            
          >
            {data.thumbnail.map((image, index) => (
              <SwiperSlide className="cont-card-search" key={index}>
                <div className="image-card">
                  <img className="image-card-search" src={`${url}/products/${image}`} alt={data.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        <div className="contenido">
          <Link to={`/details?id=${data.id}`} className="link">
            <h5 className="card-title">{data.title > 20 ? `${data.title.slice(0, 20)}...` : data.title}</h5>
          </Link>
          
          {data.ubicacion.departamento &&
            <>
              <p className="enlaces-ubicacion"><i className="bi bi-geo"></i>
                {data.ubicacion.departamento}
                {data.ubicacion.ciudad && 
                <>
                /
                {data.ubicacion.ciudad}
                </>

                }</p>
            </>
          }
          <Link to={`/details?id=${data.id}`} className="link link-info">
            <p className="card-text"><strong>{data.money}{data.price}</strong></p>
          </Link>
          <Link to={`/details?id=${data.id}`} className="link link-info">
            <p className="btn-search"> Leer Más    </p>
          </Link>
        </div>
      </div>

  )
} 