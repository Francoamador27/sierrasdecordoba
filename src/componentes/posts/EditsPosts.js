import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MapaDetails } from "../MapaDetails";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/details.css";
import { fetchEdit } from "../utils.js/fetchs/editProduct";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { DateRangePicker } from "react-date-range";
import { v4 as uuidv4 } from 'uuid';

export const EditsPosts = ()=>{

  const [state, setState] = useState({
    selection: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 1),
      key: "selection",
      color:"blue"
    },
  
  });
  const handleAddRange = (e) => {
    e.preventDefault();
    const arrayState = Object.values(state)
    const newKey = arrayState.length +1;
    setState({
      [newKey]: {
        startDate: addDays(new Date(), 1),
        endDate: null,
        key: newKey,
        color: "blue"
      },...state
    })

  };
  // const handleRemoveRange = (key) => {
  //   setState(prevState => Object.values(prevState).filter(state => state.key !== key));
  // };
    const urllocation = useLocation();
    const navigate =useNavigate()
const queryParams = new URLSearchParams(urllocation.search);
const [images, setArrayImages] = useState([])

let id = queryParams.get('id');
const [formData, setFormData] = useState({
  title: '',
  price: '',
  description: '',
  code: '',
  thumbnail: [],
  category: 'alquiler-temporal',
  stock: '',
  lat: "",
  lng:"",
});
useEffect(()=>{
  const endPoint = `http://localhost:5000/api/products/edit/${id}`;
   const getMyProducts = async () => {
    try {
      const response = await fetch(endPoint, {
        method: 'GET',
        credentials: 'include', 
      });
      const apiData = await response.json();
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const dataApi = apiData.data
      const { lat, lng } = apiData.data.location;
      const updatedFormData = { ...dataApi, lat, lng };
      setFormData(updatedFormData);
      const updatedThumbnail = apiData.data.thumbnail.map(filename => ({
        src: `http://localhost:5000/products/${filename}`,
        alt: apiData.description,

      }))
      setArrayImages(updatedThumbnail) ; 

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error en la API",
          });
    }
}
getMyProducts();
},[])
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const addPosition =(position) =>{
    setFormData({
      ...formData,
      lat: position[0],
      lng:position[1],
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
          const response = await fetchEdit(formData)
          console.log(response)
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
            });          }
        } catch (error) {
          Swal.fire({
            title: '¡Error!',
            text: 'Error intente más tarde',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });        }
      };

const deletImage =(e)=>{
  e.preventDefault();
  alert("hola")
}
console.log("state",state)
      return(
        <>
    {formData && (

      <form onSubmit={handleSubmit} encType="multipart/form-data">
    <label htmlFor="title">Título:</label>
    <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange}  />
    <div className="main-container">
    <div className="image-single">
    {images[0] && images.map((image, index) => (
      <div className="image-edit">
      <button className="delete-image" onClick={deletImage} ><i class="bi bi-trash"></i></button>
      <img key={index} className="img-thumbnail" src={image.src} alt={image.alt} />
      </div>
    ))}
   
      
             <label htmlFor="thumbnail">Cambiar imagen destacada:</label>
             <input  type="file" id="thumbnail" name="thumbnail"  accept="image/*" onChange={handleInputChange} multiple/>
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
    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} ></textarea>
<div className="money">
    <label htmlFor="price">Precio:</label>
    <select id="value" name="value" >
      <option value="$ARS">$ARS</option>
      <option value="USD">USD</option>
    </select>
    <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange}  />
</div>
    <input hidden   type="text" id="email-contact" name="email" value={formData.code} onChange={handleInputChange} /><br />


    <label htmlFor="stock">Telefono:</label>
    <input type="number" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange}  />

    </div>
  </div>
    <section>
    <h3>Ubicacion</h3>
    <MapaDetails addPosition={addPosition} location={formData.location}/>

    <div className="inputs-location">
        <div className="coordenadas">
        <label htmlFor="latitud">Longitud:</label>
        <input  type="string" id="lng" name="longitud" value={formData.lng} onInput={handleInputChange}  />
        </div>
        <div className="coordenadas">
        <label htmlFor="longitud">Latitud:</label>
        <input type="string" id="lat" name="latitud" value={formData.lat} onInput={handleInputChange}  />
        </div>
    </div>
    <div className="button ">

    <button className="addState" onClick={handleAddRange}>Agregar Rango</button>
    </div>
    <DateRangePicker 
  onChange={item => {
        setState({ ...state, ...item })}
  }
  ranges={Object.values(state).reverse()}/>
<div>
{Object.values(state) && (
  <div>
    <p>Fechas</p>

  </div>
)}   
 </div>
    </section>
    <input type="submit" value="Enviar" />
  </form>
  
  )}

</>
    ) 
}