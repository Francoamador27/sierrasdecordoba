import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Swal from "sweetalert2";
import { Loading } from "./Loading";
import "../css/details.css"
import { MapaItemsDetails } from "./maps/MapsDetails";
import GalleryCarousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css'; // Importa los estilos (asegúrate de que la ruta sea correcta)
import { DateRange } from "react-date-range";
import { addDays } from 'date-fns';
import { convertirFechasADate } from "./utils.js/formatDate";
import { Accordion } from "react-bootstrap";
import RichEditor from "./Draft/RichEditor";
import draftToHtml from 'draftjs-to-html';
import { url } from "./utils.js/endpoint/endpoint";

function Details() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let id = queryParams.get('id');
  const [dataFilm, setDataFilm] = useState(null)
  const [images, setArrayImages] = useState([])

  const [state, setState] = useState(null);
  useEffect(() => {
    const endPoint = `${url}/api/products/${id}`;
    axios.get(endPoint)
      .then(res => {
        const apiData = res.data.data;
        apiData.availability = convertirFechasADate(apiData.availability);
        console.log(apiData)
        setState(apiData.availability)
        setDataFilm(apiData);
        const updatedThumbnail = apiData.thumbnail.map(filename => ({
          src: `${url}/products/${filename}`,
          alt: apiData.description,

        }));
        setArrayImages(updatedThumbnail)
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error en la API",
        });
      })
  }, [id])
  const CustomSlide = ({ image }) => {
    const handleButtonClick = () => {
      // Aquí puedes definir la lógica que desees para el botón
      console.log('Botón clickeado para la imagen:', image);
    };
    useEffect(() => {
      const interval = setInterval(() => {
        document.getElementById('whatsapp-button').style.display = 'block';
      }, 1000); // Mostrar cada 2 minutos

      return () => clearInterval(interval);
    }, []);
    return (
      <div>
        <img src={image.src} alt={image.alt} />
        <button onClick={handleButtonClick}>Mi Botón</button>
      </div>
    );
  };
  let [descContent, setDescContent] = useState();
  useEffect(() => {
    if (dataFilm) {
      let description = JSON.parse(dataFilm.description);
      if (typeof description === 'object' && description !== null) {
        const htmlContent = draftToHtml(description);
        setDescContent(htmlContent);
      } else {
      }
    }
  }, [dataFilm]);
  console.log(images, "images");
  return (
    <section className="details-page">
      {!dataFilm &&
        <Loading />
      }
      {dataFilm && (
        <>
          <h2>{dataFilm.title}</h2>
          {dataFilm.ubicacion.departamento && // Elimina los espacios en blanco

            <>
              <p className="enlaces-ubicacion"><i className="bi bi-geo"></i>
                <Link to={`/propiedades?departamento=${dataFilm.ubicacion.departamento.replace(/\s+/g, "")}`}>{dataFilm.ubicacion.departamento}</Link>  /
                {dataFilm.ubicacion.ciudad &&
                  <Link to={`/propiedades?ciudad=${dataFilm.ubicacion.ciudad.replace(/\s+/g, "-")}`}>{dataFilm.ubicacion.ciudad}</Link>

                }</p>
            </>
          }
          <div className="main-container">


            <div className="image-single">
              <GalleryCarousel
                images={images}
                renderCustomSlide={({ image }) => <CustomSlide image={image} />}
              />            </div>
            <div className="description-info">
              <h5>Sobre la propiedad</h5>
              <h6>Esta es una propiedad en
                {dataFilm.category === 'alquiler-temporal' && (
                  " Alquiler temporal"
                )}
                {dataFilm.category === 'venta-de-terrenos' && (
                  " Venta "
                )}
                {dataFilm.category === 'alquiler-anual' && (
                  " Alquiler anual"
                )}
                {dataFilm.category === 'venta-de-propiedades' && (
                  " Venta"
                )}
              </h6>
              <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Descripción de la propiedad</Accordion.Header>
                  <Accordion.Body>


                    {descContent && <div dangerouslySetInnerHTML={{ __html: descContent }} />}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <p className="phonenumber">Numero de telefono: {dataFilm.phonenumber}</p>

              <p>Precio:<strong> {dataFilm.money} {dataFilm.price}</strong></p>
              <div>
                <Link  to={`https://wa.me/${dataFilm.phonenumber}`} target="_blank">Contactar por WhatsApp</Link>
                <br />
                <Link to={`tel:${dataFilm.phonenumber}`} >Llamar</Link>
              </div>
            </div>
          </div>
          <div id="whatsapp-button" class="chat-window">
            <div class="chat-header">
              <p>Contactate con el hospedaje</p>
            </div>
            <Link to={`https://wa.me/${dataFilm.phonenumber}`} target="_blank" class="chat-button">Haz click aqui y escribinos</Link>
          </div>
          <section className="map-agenda">
            <div className="mapa">
              <h3>Ubicación</h3>
              {dataFilm.ubicacion.departamento &&
                <>
                  <p className="data-ubicacion">{dataFilm.ubicacion.departamento} / {dataFilm.ubicacion.ciudad && dataFilm.ubicacion.ciudad}</p>
                </>
              }

              {dataFilm.location &&
                <div className="mapa">
                  <MapaItemsDetails location={dataFilm.location} title={dataFilm.title} />
                </div>
              }
            </div>
            {state &&
              <div className="agenda">
                <h5>Disponibilidad</h5>
                <p>Precio: <strong>{dataFilm.money} {dataFilm.price}</strong></p>

                <DateRange
                  editableDateInputs={true}

                  ranges={Object.values(state).reverse()} editable={false} onChange={() => { }}
                  showSelectionPreview={false} showMonthAndYearPickers={false} moveRangeOnFirstSelection={false}
                />
                <Link to={`https://wa.me/${dataFilm.phonenumber}`} target="_blank" class="chat-button">Haz click aqui y reserva</Link>
              </div>
            }

          </section>
        </>

      )}
    </section>
  )
}

export default Details;