import { useEffect, useState } from "react";
import { MenuAdmin } from "../admin/MenuAdmin";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getUsers } from "../utils.js/fetchs/getUsers";
import '../../css/user.css'
import { deleteUser } from "../utils.js/fetchs/deleteUser";
import { useSelector } from "react-redux";
import { putPremium } from "../utils.js/fetchs/putPremium";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;

    const session = useSelector((state) => state.user);
    useEffect(() => {

        const fetchUser = async () => {
            try {
                const data = await getUsers(page);
                if (data) {
                    console.log(data);
                    setUsers(data.users);
                    setPagination(data.pagination);
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
                console.error('Error al obtener usuarios:', error);
            }
        };
        fetchUser();
    }, [navigate, page]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    const handleDelete = (userId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo'
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(`Usuario con ID ${userId} eliminado`);
                const DeleteUser = await deleteUser(userId);
                console.log("DeleteUser", DeleteUser)
                if (DeleteUser.status = 'succes') {
                    setUsers(users.filter(user => user.id !== userId));
                    Swal.fire(
                        'Eliminado',
                        'El usuario ha sido eliminado.',
                        'success'
                    );

                }
                else {
                    Swal.fire({
                        title: 'Error en eliminar',
                        text: "Hubo un error en la eliminacion del usuario",
                        icon: 'warning',
                        showCancelButton: false,

                    })
                }

            }
        });
    };
    const handlePremium = (userId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, hacerlo premium'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const userUptaded = await putPremium(userId);
                console.log('userUptaded',userUptaded)
                if (userUptaded && userUptaded.status === 'success') {
                    setUsers((prevUsers) => 
                        prevUsers.map((user) => 
                            user.id === userId ? { ...user, ...userUptaded.data } : user
                        )
                    );
                    Swal.fire(
                        'Editado',
                        'El usuario ha sido editado.',
                        'success'
                    );

                }
                else {
                    Swal.fire({
                        title: 'Error en eliminar',
                        text: "Hubo un error en la eliminacion del usuario",
                        icon: 'warning',
                        showCancelButton: false,

                    })
                }

            }
        });
    };

    return (
        <>
            <MenuAdmin />
            <section className="logged">
                <h3>Listado de Usuarios</h3>
                <div className="table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Link className="edit-button" to={`/user?=${user.id}`}>Ver/Editar</Link>
                                        <button className="delete-button-user" onClick={() => handleDelete(user.id)}>Eliminar</button>

                                        {user.role === 'user' && (
                                            <>
                                                <p>Hacer premiun este usuario!</p>
                                                <div className="contactarme">
                                                    <button className="premium-button-user" onClick={() => handlePremium(user.id)}>Premium</button>

                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    {pagination.page > 1 && (
                        <button onClick={() => handlePageChange(pagination.page - 1)}>
                            Anterior
                        </button>
                    )}
                    {pagination.page < pagination.totalPages && (
                        <button onClick={() => handlePageChange(pagination.page + 1)}>
                            Siguiente
                        </button>
                    )}
                </div>
            </section>
        </>
    )
}