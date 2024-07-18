import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../css/details.css";
import { MapaDetails } from "../MapaDetails";
import { Toast } from "../utils.js/utils";
import { CardSearch } from "../cards/CardsSearch";
import { Card } from "../cards/Card";
import { fetchGallery } from "../utils.js/fetchs/createGallery";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSession } from "../utils.js/fetchs/getSession";
import { addListener } from "@reduxjs/toolkit";
import { cleanUser } from "../../redux/userSlice";
import { formatDate, stringifyDates } from "../utils.js/formatDate";
import Switch from 'react-switch';
import { addDays } from 'date-fns';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { RegionesCordoba, SelectCiudades, SelectDepartamentos } from "../utils.js/deptos";
import 'draft-js/dist/Draft.css';
import { RichEditor } from "../Draft/RichEditor";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { MenuAdmin } from "../admin/MenuAdmin";
export const CreateGallery = () => {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.user);
  const userLogged = session && session.email !== null && session.email.trim() !== '';
  const [editorState, setEditorState] = useState(null);
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (stateEditor) => {
    setEditorState(stateEditor);
    const contentState = stateEditor.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    setEditorContent(htmlContent);
    setFormData(prevFormData => ({
      ...prevFormData,
      description: JSON.stringify(rawContentState)
    }));
    console.log("desde el padre", state)
  };
  const [state, setState] = useState({
    selection: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 1),
      key: "selection",
      color: "blue"
    },
  });
  // console.log("hola")
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

  useEffect(() => {
    handleAvailabilityChange(state);
  }, [state])
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


  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        dispatch(addListener(session.user))
      } catch (error) {
        dispatch(cleanUser())
        Swal.fire({
          title: '¡Error!',
          text: 'Error no tiene acceso',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    };
    fetchSession();
  }, [userLogged, navigate]);




  const [newProduct, setNewProduct] = useState()
  const addPosition = (position) => {
    setFormData({
      ...formData,
      lat: position[0],
      lng: position[1],
    });
  }
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    let inputValue;

    // Verifica si el evento proviene del <select>
    if (type === 'select-one') {
      // Obtiene el valor seleccionado del <select>
      const selectedIndex = e.target.selectedIndex;
      inputValue = e.target.options[selectedIndex].value;
    } else {
      inputValue = type === 'file' ? Array.from(files) : value;
    }

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
      formData.availability = JSON.stringify(formData.availability);
      formData.ubicacion = JSON.stringify(formData.ubicacion);

      const response = await fetchGallery(formData)
      if (response._id) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Se ha creado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setNewProduct(response)
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
  return (

    <section className="create-page">
      <MenuAdmin />
      {!userLogged ? (
        <>
          <h2>No tienes acceso a este contenido. Debes iniciar session o  crear una cuenta Premium.</h2>
          <Link to="/login">{(<>Login</>)}</Link>
        </>

      ) : (
        <>
          {formData && (

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="title"><h5>Título</h5></label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
              <div className="main-container">
                <div className="image-single">
                  {formData.thumbnail && formData.thumbnail.map((image, index) => (
                    <img key={index} className="img-thumbnail" src={URL.createObjectURL(image)} alt={`Thumbnail ${index}`} />
                  ))}
                  <label htmlFor="thumbnail"><h6>Cambiar imagen destacada:</h6></label>
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
                  <label htmlFor="description">Descripción:</label>
                  <p>Crea la descripcion con las mejores herramientas para hacer tu descripcion escencial</p>


                  <RichEditor onEditorChange={handleEditorChange} />
                  <div className="money">
                    <label htmlFor="price">Precio:</label>
                    <select id="value" name="money" onChange={handleInputChange} required>
                      <option value="SELECCIONAR" hidden >Seleccionar</option>
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
                Para una ubicación exacta necesitamos que selecciones en el mapa el lugar exacto

                <MapaDetails addPosition={addPosition} location={formData.location} />
                <div className="inputs-location">
                  <div className="coordenadas">
                    <label htmlFor="latitud">Longitud:</label>
                    <input type="string" id="lng" name="longitud" value={formData.lng} onInput={handleInputChange} />
                  </div>
                  <div className="coordenadas">
                    <label htmlFor="longitud">Latitud:</label>
                    <input type="string" id="lat" name="latitud" value={formData.lat} onInput={handleInputChange} />
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
                        <div className="fechas" key={item.key}>
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
              <input type="submit" value="Crear" className="crear" />
            </form>

          )}
        </>
      )}

      {newProduct &&
        <div className="show-cards">
          <h3 className="text-center">Asi se muestra tu publicación</h3>

          <div className="cards-show">


            <CardSearch data={newProduct} />
            <Card data={newProduct} />
          </div>
        </div>
      }

    </section>
  )
}