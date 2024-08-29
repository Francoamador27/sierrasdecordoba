import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Loading } from "./Loading";
import 'swiper/css';
import { getAllProducts } from "./utils.js/fetchs/getAllProducts";
import { CardSearch } from "./cards/CardsSearch";

const ListadoSearch = React.memo(() => {

    const location = useLocation();
    const navigate = useNavigate();
   
     if(location.pathname === '/tours'){
        var category = 'tours';
    }else if(location.pathname === '/restaurantes'){
        var category = 'restaurantes';
    } else if(location.pathname === '/propiedades'){
        var category = 'alquiler-temporal';
    }
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || '1';
    const order = queryParams.get('order');
    const clave = queryParams.get('palabra_clave');
    const departamento = queryParams.get('departamento');
    const ciudad = queryParams.get('ciudad');

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const [message, setMessage] = useState('');

    const params = useMemo(() => {
        const params = { page };
        if (category) {
            params.category = category;
        }
        if (clave) {
            params.clave = clave;
        }
        params.limit = 6;
        if (departamento) {

            params.departamento = departamento;
            // params.category = category;
        }
        if (ciudad) {
            console.log('ciudad', ciudad)
            // params.category = category;
            params.ciudad = ciudad;
        }
        if (order) {
            params.order = order;
        }
        return params;
    }, [page, category, order, departamento, ciudad, clave]);
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const data = await getAllProducts(params);
                console.log('data', data)
                setPagination(data.pagination);

                setProducts(data.products);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error en la API',
                });
            }
        };
        fetchAll();
    }, [category, page, order, departamento, ciudad, clave]);

    const handlePageChange = (newPage) => {
        queryParams.set('page', newPage);
        navigate({ search: queryParams.toString() });
    };
    const getPageNumbers = () => {
        if (!pagination || !pagination.totalPages) {
            return [];
        }
        const totalPages = pagination.totalPages;
        const currentPage = page;
        const pages = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (products.length === 0 && !showLoading) {
                setShowLoading(true);
            }
        }, 5000);

        setShowLoading(false);
    }, [products]);
    return (
        <section className='list-prop'>
            <h2 className='title-search'>Resultado de busqueda   {clave && clave}  <span className='localidad'>{departamento && departamento} {ciudad && ciudad} </span> </h2>
            {(!products || products.length === 0) && !showLoading ? (
                <Loading />
            ) : (
                products.length > 0 ? 'Estos son los resultados' : 'No se encontraron resultados de búsqueda con esas características'
            )}

            <div className="list-props">
                {products.map((oneMovie, index) => (
                    <CardSearch key={index} data={oneMovie} />
                ))}
            </div>
            <div className="pagination">
                {pagination && pagination.totalPages > 1 && (
                    <div className="pagination">
                        {pagination.hasPrevPage && (
                            <button className='pagination-button paginatio-search' onClick={() => handlePageChange(pagination.prevPage)}>Anterior</button>
                        )}
                        {getPageNumbers().map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={pageNumber === parseInt(page) ? 'pagination-active pagination' : ' pagination paginatio-search'}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        {pagination.hasNextPage && (
                            <button className='pagination-button paginatio-search' onClick={() => handlePageChange(pagination.nextPage)}>Siguiente</button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
});

export default ListadoSearch;