import { useEffect, useState } from "react";
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
import { MenuAdmin } from "./admin/MenuAdmin";

export const Myproducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products , setProducts] = useState()
  const dataProducts = useSelector(state => state.myproducts)
  console.log(dataProducts)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyProducts();
        if (data) {
          setProducts(data);
          dispatch(setMyProducts(data))
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
  }, [navigate, dispatch]);

  return (
    <section className="logged my-product">
        <>
          {products ? (
            <>
            <MenuAdmin />
              <h2>Tienes acceso. Estas son tus publicaciones</h2>
              <div className="row">
                {dataProducts.products.map((prop, index) => (
                  <div className='col-12 col-sm-6 col-md-4 col-lg-3 ' key={index}>
                    <MyCards  data={prop} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Loading />
          )}
        </>
    </section>
  )
}