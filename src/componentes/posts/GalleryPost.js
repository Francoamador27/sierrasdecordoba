import {  useEffect, useState } from "react";
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
export const CreateGallery = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state)=> state.user);
  const userLogged  = session && session.email !== null && session.email.trim() !== '';
   useEffect(() => {
     const fetchSession = async () => {
       try{
         const session = await getSession();
         dispatch(addListener(session.user))      
       } catch (error) {
            dispatch(cleanUser())
            Swal.fire({
              title: '¡Error!',
              text: 'Error no tiene acceso',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });         }
     };
     fetchSession();
   }, [userLogged,navigate]);


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
const [newProduct, setNewProduct] = useState()
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
            });          }
        } catch (error) {
          Swal.fire({
            title: '¡Error!',
            text: 'Error intente más tarde',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });        }
      };
    return(
        <>
        {!userLogged ? (
          <>
    <h2>No tienes acceso a este contenido. Debes iniciar session o  crear una cuenta Premium.</h2>
    <Link to="/login">{(<>Login</>)}</Link>
          </>

    ) : (
    <>
    {formData && (

      <form onSubmit={handleSubmit} encType="multipart/form-data">
    <label htmlFor="title">Título:</label>
    <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange}  />
    <div className="main-container">
    <div className="image-single">
    {formData.thumbnail && formData.thumbnail.map((image, index) => (
      <img key={index} className="img-thumbnail" src={URL.createObjectURL(image)} alt={`Thumbnail ${index}`} />
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
    </section>
    <input type="submit" value="Enviar" />
  </form>
  
  )}
    </>
    )}
  
  {newProduct &&
    <>

    <CardSearch data={newProduct}/>
    <Card data={newProduct}/>
</>
  }

</>
    ) 
}