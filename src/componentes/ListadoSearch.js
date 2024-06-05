import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Loading } from "./Loading";
import 'swiper/css';
import { getAllProducts } from "./utils.js/fetchs/getAllProducts";
import { CardSearch } from "./cards/CardsSearch";

const ListadoSearch = React.memo(() => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || '1';
    const order = queryParams.get('order');
    const category = queryParams.get('category');
    
    const [products, setProducts] = useState([]);

    const params = useMemo(() => {
        const params = { page };
        if (category) {
            params.category = category;
        }
        if (order) {
            params.order = order;
        }
        return params;
    }, [page, category, order]);
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const data = await getAllProducts(params);
                setProducts(data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error en la API',
                });
            }
        };
        fetchAll();
    }, [category , page,order]);
    return (
        <section className='list-prop'>
            {(!products || products.length === 0) && <Loading />}
            <div className="list-props">
                {products.map((oneMovie, index) => (
                    <CardSearch key={index} data={oneMovie} />
                ))}
            </div>
        </section>
    );
});

export default ListadoSearch;