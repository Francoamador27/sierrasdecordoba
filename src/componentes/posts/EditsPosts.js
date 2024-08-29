import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MapaDetails } from "../MapaDetails";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/details.css";
import { fetchEdit } from "../utils.js/fetchs/editProduct";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Toast } from "../utils.js/utils";
import { DateRange } from "react-date-range";
import { addDays } from 'date-fns';
import { getEditPage } from "./getEditPage";
import { convertirFechasADate, formatDate, stringifyDates } from "../utils.js/formatDate";
import Switch from 'react-switch';
import { RegionesCordoba, SelectCiudades, SelectDepartamentos } from "../utils.js/deptos";
import { fetchImageDelete } from "../utils.js/fetchs/deleteImage";
import { RichEditor } from "../Draft/RichEditor";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { MenuAdmin } from "../admin/MenuAdmin";
import { url } from "../utils.js/endpoint/endpoint";
export const EditsPosts = () => {

  const [isChecked, setIsChecked] = useState(true);

  const handleChange = (checked) => {
    if (checked === false) {
      setState({
        selection: {} // Establecer el estado inicial como un objeto vacío
      });
    } else {
      setState({
        selection: {
          startDate: addDays(new Date(), 1),
          endDate: addDays(new Date(), 1),
          key: "selection",
          color: "blue"
        },
      })
    }
    setIsChecked(checked);
  };

  const handleAvailabilityChange = (availability) => {
    const availabilityStringified = stringifyDates(availability);
    setFormData({
      ...formData,
      availability: availabilityStringified,
    });
  };
  const urllocation = useLocation();
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(urllocation.search);
  const [images, setArrayImages] = useState([])
  const [state, setState] = useState({
    selection: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 1),
      key: "selection",
      color: "blue"
    },
  });

  useEffect(() => {
    handleAvailabilityChange(state);
  }, [state])
  let id = queryParams.get('id');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    code: '',
    thumbnail: [],
    availability: {},
    category: 'alquiler-temporal',
    stock: '',
    lat: "",
    lng: "",
    ubicacion: {},
  });


  useEffect(() => {
    const getMyProducts = async () => {
      try {
        const apiData = await getEditPage(id);
        const dataApi = apiData.data;
        const { lat, lng } = apiData.data.location;
        const updatedFormData = { ...dataApi, lat, lng };
        setFormData(updatedFormData);
        updatedFormData.availability = convertirFechasADate(updatedFormData.availability);
        if (updatedFormData.availability) {

          setState(updatedFormData.availability)
        }
        const updatedThumbnail = apiData.data.thumbnail.map(filename => ({
          src: `${url}/products/${filename}`,
          alt: apiData.description,

        }))
        setArrayImages(updatedThumbnail);

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error en la API",
        });
      }
    }
    getMyProducts();
  }, [])


  const addPosition = (position) => {
    setFormData({
      ...formData,
      lat: position[0],
      lng: position[1],
    });
  }
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const inputValue = type === 'file' ? Array.from(files) : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    Toast.fire({
      icon: "info",
      title: "creating"
    });
    try {
      formData.ubicacion = JSON.stringify(formData.ubicacion);
      formData.availability = JSON.stringify(formData.availability);
      const response = await fetchEdit(formData, id)
      if (response) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Se ha creado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: '¡Error!',
          text: 'No se pudo crear la publicacion corrobore que todo este bien completado',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      Swal.fire({
        title: '¡Error!',
        text: 'Error intente más tarde',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const deletImage = async (e, image) => {
    e.preventDefault();
    const imagePath = image.split('/').pop();
    const productUpdated = await fetchImageDelete(id, imagePath)
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnail: productUpdated.data.thumbnail,
    }));
    const updatedThumbnail = productUpdated.data.thumbnail.map(filename => ({
      src: `${url}products/${filename}`,
      alt: productUpdated.data.description,

    }))
    setArrayImages(updatedThumbnail);
  }

  const handleAddRange = (e) => {
    e.preventDefault();
    const arrayState = Object.values(state)
    const newKey = arrayState.length + 1;

    setState({
      [newKey]: {
        startDate: addDays(new Date(), 1),
        endDate: null,
        key: newKey,
        color: "blue"
      }, ...state
    })

  };


  const handleRemoveRange = (e, key) => {
    e.preventDefault(); // Evita el comportamiento por defecto del evento (por ejemplo, evitar que el formulario se envíe)

    setState((prevState) => {
      const newState = { ...prevState };
      delete newState[key];
      return newState;
    });
  };
  const handleEditChange = (item) => {
    setState({ ...state, ...item });
  };
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [ciudadesDepartamentoSeleccionado, setCiudadesDepartamentoSeleccionado] = useState([]);

  const handleSelectDepartamento = (departamento) => {
    setDepartamentoSeleccionado(departamento);
    const ciudades = RegionesCordoba.find(region => region.departamento === departamento)?.ciudades || [];
    setCiudadesDepartamentoSeleccionado(ciudades);
    setFormData({
      ...formData,
      ubicacion: {
        departamento: departamento,
      }
    });
  };
  const handleSelectCiudad = (ciudad) => {
    setFormData({
      ...formData,
      ubicacion: {
        ...formData.ubicacion,
        ciudad: ciudad
      }
    });
  };
  const [editorState, setEditorState] = useState(null);

  const handleEditorChange = (stateEditor) => {
    setEditorState(stateEditor);
    const contentState = stateEditor.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    setFormData(prevFormData => ({
      ...prevFormData,
      description: JSON.stringify(rawContentState)
    }));
  };
console.log(formData);
  return (
    <section className="edit-page">
      <MenuAdmin />
      {id &&
        <p className="ver-details">
          <Link to={`/details?id=${id}`} >
            <i className="bi bi-eye"></i>
            Ver publicación</Link>

        </p>
      }
      {formData && (

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
          <div className="main-container">
            <div className="image-single">
              {images[0] && images.map((image, index) => (
                <div key={index} className="image-edit">
                  <button className="delete-image" onClick={(e) => deletImage(e, image.src)}>
                    <i className="bi bi-trash"></i>
                  </button>
                  <img key={index} className="img-thumbnail" src={image.src} alt={image.alt} />
                </div>
              ))}


              <label htmlFor="thumbnail">Cambiar imagen destacada:</label>
              <input type="file" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleInputChange} multiple />
            </div>
            <div className="description-info">
              <label htmlFor="category">Tipo de publicación:</label>
              <select id="category" name="category" value={formData.category} onChange={handleInputChange} >
                <option value="alquiler-temporal">Alquiler temporal</option>
                <option value="alquiler-anual">Alquiler anual</option>
                <option value="venta-de-terrenos">Venta de terrenos</option>
                <option value="venta-de-propiedades">Venta de propiedades</option>
              </select>
              {formData.description &&
                <>
                  <label htmlFor="description">Descripción:</label>
                  <RichEditor initialState={JSON.parse(formData.description)}  onEditorChange={handleEditorChange} />
                </>
              }
              <div className="money">
                <label htmlFor="price">Precio:</label>
                <select id="value" name="value" >
                  <option value="$ARS">$ARS</option>
                  <option value="USD">USD</option>
                </select>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} />
              </div>
              <input hidden type="text" id="email-contact" name="email" value={formData.code} onChange={handleInputChange} /><br />


              <label htmlFor="stock">Telefono:</label>
              <input type="number" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} />

            </div>
          </div>
          <section>
            <h3>Ubicacion</h3>
            <SelectDepartamentos
              departamentos={RegionesCordoba}
              onSelectDepartamento={handleSelectDepartamento}
              valorInicial={formData.ubicacion ? formData.ubicacion.departamento : ""}
            />
            {departamentoSeleccionado && (
              <SelectCiudades ciudades={ciudadesDepartamentoSeleccionado} onSelectCiudad={handleSelectCiudad}
                valorInicial={formData.ubicacion.ciudad}
              />
            )}
            <div className="mapa-edit">
              <p>Para una ubicación exacta necesitamos que selecciones en el mapa el lugar exacto</p>
              <MapaDetails addPosition={addPosition} location={formData.location} title={formData.title} />
            </div>
            <div className="inputs-location">
              <div className="coordenadas">
                <input hidden type="string" id="lng" name="longitud" value={formData.lng} onInput={handleInputChange} />
              </div>
              <div className="coordenadas">
                <input hidden type="string" id="lat" name="latitud" value={formData.lat} onInput={handleInputChange} />
              </div>
            </div>
          </section>

          <div className="switch">
            <h3>Disponibilidad: </h3>
            <div>

              <p className="siwtch-check">¿Quieres indicar rangos de fecha con la disponibilidad?
              </p>

              <Switch
                onChange={handleChange}
                checked={isChecked}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={48}
              />
              {isChecked ? 'Si' : 'No'}
            </div>
          </div>
          {isChecked &&

            <section className="agenda">
              <section>
                <h3 className="text-center">Disponibilidad</h3>
                <div className="button ">
                  <button className="addState" onClick={handleAddRange}>Agregar Rango de Fechas</button>
                </div>
                {state && (
                  <DateRange
                    onChange={handleEditChange}
                    ranges={Object.values(state).reverse()}
                  />
                )}

              </section>


              <section>

                <h3>
                  Rangos de Fechas existentes
                </h3>
                <div className="group-dates">
                  {state && Object.values(state) && Object.values(state).reverse().map((item, index) => (
                    <div className="fechas" key={index}>
                      <p>Disponibilidad</p>
                      <p>Dia Inicial: {item.startDate ? formatDate(item.startDate) : 'No Seleccionado'}</p>
                      <p>Dia Final: {item.endDate ? formatDate(item.endDate) : 'No seleccionado'}</p>
                      <button className="delete-range" onClick={(e) => handleRemoveRange(e, item.key)}><i className="bi bi-calendar2-x"></i> Eliminar</button>

                    </div>
                  ))}
                </div>
              </section>
            </section>
          }



          <input type="submit" value="Guardar" />
        </form>

      )}

    </section>
  )
}