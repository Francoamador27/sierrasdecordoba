import { useState } from "react";
import Listado from "./Listado";
import { BannerMain } from "./banner/banneMain";
import { useSelector } from "react-redux";
import { RegionesCordoba } from "./utils.js/deptos";

export function Home() {
    const ubicaciones = useSelector(state => state.ubicaciones);
    console.log('ubicaciones', ubicaciones);
    const [showProducts, setShowProducts] = useState(true);
    function buscarImagenPorDepartamento(departamento) {
        // Convertir el nombre del departamento a minúsculas para asegurar la búsqueda insensible a mayúsculas
        const nombreDepartamento = departamento.toLowerCase();

        // Buscar el objeto departamento dentro del arreglo RegionesCordoba
        const regionEncontrada = RegionesCordoba.find(region => region.departamento.toLowerCase() === nombreDepartamento);

        // Verificar si se encontró la región y devolver la imagen si existe
        if (regionEncontrada && regionEncontrada.imagen) {
            return regionEncontrada.imagen;
        } else {
            return null; // Si no se encuentra el departamento o no tiene imagen, devolver null o manejar según necesites
        }
    }
    return (
        <>
            <BannerMain />
            <section className="home-page">
                <div className="main-content-home">
                    {ubicaciones.slice(0, 3).map((ubicacion, index) => (
                        <div key={index}>
                            <h3><a className="titulos-con-propiedades" href={`propiedades?palabra_clave=&category=alquiler-temporal&departamento=${ubicacion.departamento}`}>Propiedades en departamento {ubicacion.departamento}</a></h3>
                            <ul className="dept-ul">
                                {ubicacion.ciudades.slice(0, 3).map((ciudad, ciudadIndex) => (
                                    <li key={ciudadIndex}>{ciudad}/ </li>
                                ))}
                            </ul>
                            <Listado category="alquiler-temporal" departamento={ubicacion.departamento} order="asc" onProductsLoaded={setShowProducts} />
                        </div>
                    ))}
                    {ubicaciones.slice(0, 4).map((ubicacion, index) => (
                        <div key={index}>
                            {ubicacion.ciudades.slice(0, 4).map((ciudad, ciudadIndex) => (
                                <>
                                    <h3>Propiedades en {ciudad}</h3>
                                    <Listado category="alquiler-temporal" ciudad={ciudad} order="asc" onProductsLoaded={setShowProducts} />
                                </>
                            ))}
                        </div>
                    ))}


                </div>

                <div className='adds adds-right'>
                    {ubicaciones.slice(0, 4).reverse().map((ubicacion, index) => (
                        <div key={index} className="regiones-div" style={{ backgroundImage: `url(../../regiones/${buscarImagenPorDepartamento(ubicacion.departamento)})` }}>
                            <h3 className="title-regions"><a href={`propiedades?palabra_clave=&category=alquiler-temporal&departamento=${ubicacion.departamento}`}>Alquilar propiedad en  {ubicacion.departamento}</a></h3>
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
                                    <h3 className="title-regions"><a href={`propiedades?palabra_clave=&category=alquiler-temporal&ciudad=${ciudad}`}>Alquilar propiedad en  {ciudad}</a></h3>
                                ))}
                            </ul>
                        </div>
                    ))}



                </div>
            </section>
        </>
    )
}