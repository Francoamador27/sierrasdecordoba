import { useSearchParams } from "react-router-dom";
import { MenuAdmin } from "../admin/MenuAdmin";
import { useEffect, useState } from "react";
import { getUserById } from "../utils.js/fetchs/getUserId";
import { UpdatePassword } from "../updateProfile.js/udpatePassword";
import { getAllProducts } from "../utils.js/fetchs/getAllProducts";
import { MyCards } from "../cards/MyCards";

export const User = () => {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState(null); // Inicializar con null para manejar la ausencia de datos.
    const [params, setParams] = useState(null); // Inicializar con null para manejar la ausencia de datos.
    const [products, setProducts] = useState(null); // Inicializar con null para manejar la ausencia de datos.
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
    useEffect(() => {
        const fetchProducts = async () => {
            if (user && user.email) {
                let params = {};
                if (user.role === 'admin') {
                    params = { owner: 'admin' };

                } else {
                    params = { owner: user.email };

                }
                const data = await getAllProducts(params);
                setProducts(data.products);
                console.log(data.products);
            }
        };
        fetchProducts();
    }, [user]);

    return (
        <>
            <MenuAdmin />
            <section className="logged">
                {/* Renderizar la información del usuario si existe */}
                {user ? (
                    <div>
                        <p>Usuario</p>
                        <h5>{`${user.firstName} ${user.lastName}`}</h5>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>User id: {user._id}</p>
                        <p>Last Connection: {new Date(user.lastConnection).toLocaleString()}</p>
                        <UpdatePassword email={user.email} id={user._id} />
                        <h5>Publicaciones del usuario {`${user.firstName} ${user.lastName}`} </h5>
                        <section className="user-page-products">

                            {products &&

                                products.map((prop, index) => (
                                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 ' key={index}>
                                        <MyCards data={prop} />
                                    </div>
                                ))

                            }
                        </section>
                    </div>

                ) : (
                    <p>Cargando usuario...</p>
                )}
            </section>
        </>
    );
};