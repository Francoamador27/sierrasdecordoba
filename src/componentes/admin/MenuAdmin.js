import { Link, useNavigate } from "react-router-dom";
import '../../css/menu-admin.css';
import { Unlog } from "../Unlog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSession } from "../utils.js/fetchs/getSession";
import { addListener } from "@reduxjs/toolkit";
import { cleanUser } from "../../redux/userSlice";

export const MenuAdmin = () => {
    const dispatch = useDispatch();
    const [userLogged, setUserLogged] = useState(false);
    const [session, setSession] = useState(useSelector((state) => state.user));
    const navigate = useNavigate();

    useEffect(() => {
        setUserLogged(session && session.email !== null && session.email.trim() !== '');
    }, [session]);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionData = await getSession();
                if (sessionData && sessionData.user) {
                    dispatch(addListener(sessionData.user));
                    setSession(sessionData.user);
                    setUserLogged(true) // Usa setUser para actualizar el estado
                } else {
                    navigate("/login");
                }
            } catch (error) {
                dispatch(cleanUser());
                navigate("/login");
            }
        };
        fetchSession();
    }, []);

  

    return (
        <>
            {!userLogged ? (
                <h2>No tienes acceso a este contenido. Debes crear una cuenta Premium.</h2>
            ) : (
                <div className="l-navbar" id="nav-bar">
                    <nav className="nav">
                        <div>
                            <div className="nav_list">
                             

                                <Link title="Mi cuenta" to="/login" className="nav_link">
                                    <i className='bx bx-user nav_icon'></i>
                                    <span className="nav_name">Users</span>
                                </Link>
                                {session.role === 'admin' && (
                                    <>
                                        <hr className="menu-admin-hr" />
                                        <Link title="Ver Usuarios" to="/users" className="nav_link">
                                            <i className='bx bxs-user-account nav_icon'></i>
                                            <span className="nav_name">Usuarios</span>
                                        </Link>
                                    </>
                                )}
                                {(session.role === 'admin' || session.role === 'premium') && (
                                    <>
                                        <hr className="menu-admin-hr" />
                                        <Link title="Ver Productos" to="/myproducts" className="nav_link">
                                            <i className='bx bx-folder nav_icon'></i>
                                            <span className="nav_name">Productos</span>
                                        </Link>
                                        <Link title="Crear un producto" to="/createproducts" className="nav_link">
                                            <i className='bx bxs-folder-plus nav_icon'></i>
                                            <span className="nav_name">Productos</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="nav_link unlog">
                            <Unlog />
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};