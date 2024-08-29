import { useSearchParams } from "react-router-dom";
import { MenuAdmin } from "../admin/MenuAdmin";
import { useEffect, useState } from "react";
import { getUserById } from "../utils.js/fetchs/getUserId";

export const User = () => {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState(null); // Inicializar con null para manejar la ausencia de datos.
    const id = searchParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const data = await getUserById(id);
                setUser(data.data);
            }
        };
        fetchData();
    }, [id]);
    console.log(user)
    return (
        <>
            <MenuAdmin />
            <section className="logged">
                {/* Renderizar la información del usuario si existe */}
                {user ? (
                    <div>
                        <h2>{`${user.firstName} ${user.lastName}`}</h2>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>Cart ID: {user.cart}</p>
                        <p>Last Connection: {new Date(user.lastConnection).toLocaleString()}</p>
                        {/* Puedes agregar más campos según sea necesario */}
                    </div>
                ) : (
                    <p>Cargando usuario...</p>
                )}
            </section>
        </>
    );
};