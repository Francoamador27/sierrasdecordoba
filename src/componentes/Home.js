import { useState } from "react";
import Listado from "./Listado";
import { BannerMain } from "./banner/banneMain";
import { useSelector } from "react-redux";
import { RegionesCordoba } from "./utils.js/deptos";
import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

// Usa los módulos que necesites
export function Home() {
    const ubicaciones = useSelector(state => state.ubicaciones);
    const ubiTours = useSelector(state => state.ubiTours);
    console.log('ubiTours', ubiTours);
    const [showProducts, setShowProducts] = useState(true);
    function buscarImagenPorDepartamento(departamento) {
        const nombreDepartamento = departamento.toLowerCase();
        const regionEncontrada = RegionesCordoba.find(region => region.departamento.toLowerCase() === nombreDepartamento);
        if (regionEncontrada && regionEncontrada.imagen) {
            return regionEncontrada.imagen;
        } else {
            return null; 
        }
    }
    return (
        <>
            <BannerMain />
            <section className="home-page">
                <div className="main-content-home">
                    {ubicaciones.slice(0, 3).map((ubicacion, index) => (
                        <div key={index}>
                            <h3><Link className="titulos-con-propiedades" to={`/propiedades?palabra_clave=&category=alquiler-temporal&departamento=${ubicacion.departamento}`}>Alquiler temporario en el departamento de {ubicacion.departamento}</Link></h3>
                            <ul className="dept-ul">
                                {ubicacion.ciudades.slice(0, 3).map((ciudad, ciudadIndex) => (
                                    <li key={ciudadIndex}>{ciudad}/ </li>
                                ))}
                            </ul>
                            <Listado category="alquiler-temporal" departamento={ubicacion.departamento} order="asc" onProductsLoaded={setShowProducts} />
                        </div>
                    ))}

                    <div className="seccion-regiones">
                        <h3>Alquiler temporario por regiones</h3>

                        <Swiper

                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            loop="true"
                            breakpoints={{
                                // Cuando el ancho de la pantalla sea igual o mayor a 768px, muestra 2 slides por vista
                                400: {
                                    slidesPerView: 1
                                },
                                500: {
                                    slidesPerView: 2
                                },
                                850: {
                                    slidesPerView: 3
                                },
                                // Cuando el ancho de la pantalla sea igual o mayor a 1024px, muestra 3 slides por vista
                                1024: {
                                    slidesPerView: 3
                                }
                            }}
                            spaceBetween={50}
                            centeredSlides={true}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}

                        >
                            {ubicaciones.slice(0, 4).reverse().map((ubicacion, index) => (
                                <SwiperSlide key={index} className="card-home">
                                    {({ isNext }) => (
                                        <div key={index} className={isNext ? 'active-region regiones-div cards-reginons' : 'regiones-div cards-reginons'} style={{ backgroundImage: `url(../../regiones/${buscarImagenPorDepartamento(ubicacion.departamento)})` }}>
                                            <h3 className="title-regions"><Link to={`/propiedades?palabra_clave=&category=alquiler-temporal&departamento=${ubicacion.departamento}`}>Alquilar propiedad en  {ubicacion.departamento}</Link></h3>
                                            {/* Mostrar ciudades si es necesario */}
                                            {/* <ul className="dept-ul">
                           {ubicacion.ciudades.slice(0, 3).map((ciudad, ciudadIndex) => (
                             <li key={ciudadIndex}>{ciudad}/ </li>
                           ))}
                         </ul> */}
                                        </div>
                                    )}
                                </SwiperSlide>

                            ))}


                        </Swiper>

                    </div>

                    {ubicaciones.slice(0, 4).map((ubicacion, index) => (
                        <div key={index}>
                            {ubicacion.ciudades.slice(0, 4).map((ciudad, ciudadIndex) => (
                                <>
                                    <h3 key={ciudadIndex}>Alquileres temporarios en {ciudad}</h3>
                                    <Listado category="alquiler-temporal" ciudad={ciudad} order="asc" onProductsLoaded={setShowProducts} />
                                </>
                            ))}
                        </div>
                    ))}


                </div>

                <div className='adds adds-right'>
                    {ubicaciones.slice(0, 4).reverse().map((ubicacion, index) => (
                        <div key={index} className="regiones-div" style={{ backgroundImage: `url(../../regiones/${buscarImagenPorDepartamento(ubicacion.departamento)})` }}>
                            <h3 className="title-regions"><Link to={`/propiedades?palabra_clave=&category=alquiler-temporal&departamento=${ubicacion.departamento}`}>Alquilar propiedad en  {ubicacion.departamento}</Link></h3>
                            {/* Mostrar ciudades si es necesario */}
                            {/* <ul className="dept-ul">
                           {ubicacion.ciudades.slice(0, 3).map((ciudad, ciudadIndex) => (
                             <li key={ciudadIndex}>{ciudad}/ </li>
                           ))}
                         </ul> */}
                        </div>
                    ))}
                    {ubicaciones.slice(0, 3).reverse().map((ubicacion, index) => (
                        <div key={index} className="regiones-div" style={{ backgroundImage: `url(../../regiones/${buscarImagenPorDepartamento(ubicacion.departamento)})` }}>
                            {/* Mostrar ciudades si es necesario */}
                            <ul className="dept-ul">
                                {ubicacion.ciudades.slice(0, 1).map((ciudad, ciudadIndex) => (
                                    <h3 className="title-regions"><Link to={`/propiedades?palabra_clave=&category=alquiler-temporal&ciudad=${ciudad}`}>Alquilar propiedad en  {ciudad}</Link></h3>
                                ))}
                            </ul>
                        </div>
                    ))}



                </div>
            </section>
        </>
    )
}