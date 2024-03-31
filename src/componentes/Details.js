import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";
import { Loading } from "./Loading";
import "../css/details.css"
import { MapaItemsDetails } from "./maps/MapsDetails";
import GalleryCarousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css'; // Importa los estilos (asegúrate de que la ruta sea correcta)

function Details(){

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
let id = queryParams.get('id');
const [dataFilm, setDataFilm] = useState(null)
const [images, setArrayImages] = useState([])
useEffect(()=>{
  const endPoint = `http://localhost:5000/api/products/${id}`;
  axios.get(endPoint)
    .then(res=>{
        const apiData = res.data.data;
        setDataFilm(apiData);
        console.log(apiData)
        const updatedThumbnail = apiData.thumbnail.map(filename => ({
          src: `http://localhost:5000/products/${filename}`,
          alt: apiData.description,

        }));
           console.log("updatedThumbnail",updatedThumbnail)
        setArrayImages(updatedThumbnail)  
       })
        .catch(error=>{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error en la API",
          });
    })
},[])
const CustomSlide = ({ image }) => {
  const handleButtonClick = () => {
    // Aquí puedes definir la lógica que desees para el botón
    console.log('Botón clickeado para la imagen:', image);
  };

  return (
    <div>
      <img src={image.src} alt={image.alt} />
      <button onClick={handleButtonClick}>Mi Botón</button>
    </div>
  );
};
return(
    <>
    {!dataFilm && 
    <Loading/>
    }
    {dataFilm && (  
      <>
        <h2>{dataFilm.title}</h2>
        <div className="main-container">

          
            <div className="image-single">
            <GalleryCarousel
        images={images}
        renderCustomSlide={({ image }) => <CustomSlide image={image} />}
      />            </div>
            <div className="description-info">
              <h5>Sobre el Alojamiento</h5> 
              <h6>Esta es una propiedad en  
              {dataFilm.category === 'alquiler-temporal' && (
                " Alquiler temporal"
                )}
                {dataFilm.category === 'venta-de-terrenos' && (
                  " Venta de terreno"
                )}
                {dataFilm.category === 'alquiler-anual' && (
                 " Alquiler anual"
                )}
              </h6>
                <p className="descripcion">{dataFilm.description}</p>
                <p className="phonenumber">Numero de telefono: {dataFilm.phonenumber}</p>
           
              <p>Precio {dataFilm.price}</p>
            </div>
      </div>
    <div className="mapa">
            <MapaItemsDetails location={dataFilm.location}/>
    </div>
    </>

   ) }
    </>
)
}

export default Details;