import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/card.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { url } from "../utils.js/endpoint/endpoint";
export const Card = (props) => {
  const [hovered, setHovered] = useState(false);
  const handleHover = () => {
    setHovered(true);
  };
  const handleLeave = () => {
    setHovered(false);
  };
  const { data } = props;


  return (
    <>
      <div onMouseEnter={handleHover} onMouseLeave={handleLeave} className="card ">
        <div className="imagen">
          <Swiper
            pagination={{
              type: 'progressbar',
            }}
            navigation={true}
            modules={[Navigation, Pagination]}
            className="mySwiper"
            spaceBetween={50}
            slidesPerView={1}
       
          >
            {data.thumbnail.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="imagen">
                  <img className="img-card" src={`${url}/products/${image}`} alt={data.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={`left-curve ${hovered ? 'active-hover' : ''}`}></div>
        <div className={`right-curve ${hovered ? 'active-hover' : ''}`}></div>
        <div className="info text-center">
          <h5 className="card-title  title-card up-case">{data.title > 20 ? `${data.title.slice(0, 20)}...` : data.title}</h5>
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

          <p className=" card-text"><strong>{data.money}{data.price}</strong></p>
          <div className="text-center div-btn">
            <Link to={`/details?id=${data.id}`} className={` btn-card btn-primary ${hovered ? 'active-hover' : ''}`} >Ver Más</Link>
          </div>
        </div>
      </div>
    </>
  )
}