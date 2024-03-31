import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Loading } from "./Loading";
import { cleanUser } from "../redux/userSlice";
import { MyCards } from "./cards/MyCards";
import { getMyProducts } from "./utils.js/fetchs/getMyproducts";
import { getSession } from "./utils.js/fetchs/getSession";
import { addListener } from "@reduxjs/toolkit";
import { setMyProducts } from "../redux/myproductsSlice";

export const Myproducts = ()=>{
  const dispatch = useDispatch();
    const session = useSelector((state)=> state.user);
    const userLogged  = session && session.email !== null && session.email.trim() !== '';
    const navigate = useNavigate() ;
    const myProductsList = useSelector((state)=> state.myproducts);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getMyProducts();
        if (products) {
          dispatch(setMyProducts(products));
        } else {
          Swal.fire({
            title: '¡Error!',
            text: 'No tienes acceso; debes iniciar sesión con una cuenta premium',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          navigate("/login");
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchData();
  }, [ navigate,dispatch]);
  useEffect(() => {
    const fetchSession = async () => {
      try{
        const session = await getSession();
        dispatch(addListener(session.user))      
      } catch (error) {
          dispatch(cleanUser())
          navigate("/login")
      }
    };
    fetchSession();
  }, [dispatch,navigate]);
  return (
        <>
        {!userLogged ? (
    <h2>No tienes acceso a este contenido. Debes crear una cuenta Premium.</h2>
    ) : (
    <>
        {myProductsList ? (
            <>
                <h2>Tienes acceso. Estas son tus publicaciones</h2>
                <div className="row">
        {myProductsList.map((prop) => (
          <>
       <MyCards data={prop} />
      </>
        ))}
      </div>
            </>
        ) : (
            <Loading />
        )}
    </>
)}
        </>
    )
}