import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useLocation } from 'react-router-dom';
import { buscarCoordenadasPorDepartamento } from '../utils.js/deptos';
import customIconUrl from '../../marker/home.png';
import customIconUrl2 from '../../marker/ubicacion.png';
import L from 'leaflet';
import { getAllProducts } from '../utils.js/fetchs/getAllProducts';
import Swal from 'sweetalert2';
import { url } from '../utils.js/endpoint/endpoint';
const MapWithMarkers = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const departamento = queryParams.get('departamento');
    const page = '1';
    const order = queryParams.get('order');
    const ciudad = queryParams.get('ciudad');
    const categoryList  = location.pathname; 
    if(categoryList === '/tours'){
        var category = 'tours';
    }else if(categoryList === '/restaurantes'){
        var category = 'restaurantes';
    } else if(categoryList === '/propiedades'){
        var category = 'alquiler-temporal';
    }
    const clave = queryParams.get('palabra_clave');

    const [position, setPosision] = useState([-31.2994, -64.4985]);

    useEffect(() => {
        if (departamento) {
            const cordenadas = buscarCoordenadasPorDepartamento(departamento);
            setPosision(cordenadas)

        }
    }, [departamento])

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({

        iconRetinaUrl: customIconUrl,
        iconUrl: customIconUrl,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [40, 41], // tamaño del icono
        iconAnchor: [12, 41],
        popupAnchor: [1, -34], // punto desde donde debe abrirse el popup en relación con el icono
        shadowSize: [41, 41]
    });

    const customIcon1 = L.icon({

        iconRetinaUrl: customIconUrl,
        iconUrl: customIconUrl,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [40, 41], // tamaño del icono
        iconAnchor: [12, 41],
        popupAnchor: [1, -34], // punto desde donde debe abrirse el popup en relación con el icono
        shadowSize: [41, 41]
    });

    const customIcon2 = L.icon({
        iconRetinaUrl: customIconUrl2,
        iconUrl: customIconUrl2,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [40, 41], // tamaño del icono
        iconAnchor: [12, 41],
        popupAnchor: [1, -34], // punto desde donde debe abrirse el popup en relación con el icono
        shadowSize: [41, 41]
    });

    const markers = [
        { id: 1, position: [-31.2994, -64.4985], text: 'Marker 1' },
        { id: 2, position: [-31.421082629081614, -424.4961024740947], text: 'Marker 2' },
        // Puedes agregar más marcadores según tus necesidades
    ];
    const params = useMemo(() => {
        const params = { page };
        if (category) {
            params.category = category;
        }
        if (departamento) {
            console.log('depto', departamento)
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
        if (clave) {
            params.clave = clave;
        }
        return params;
    }, [page, category, order, departamento, ciudad,clave]);
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const data = await getAllProducts(params);
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
    }, [category, page, order, departamento, ciudad,clave]);

    const correctLongitude = (lng) => {
        // Corrige la longitud si está fuera del rango [-180, 180]
        while (lng < -180) lng += 360;
        while (lng > 180) lng -= 360;
        return lng;
    };
    return (
        <>
            {departamento && departamento}
            <MapContainer key={position[0]} center={position} zoom={11} style={{ height: '700px' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {products.map(product => (
                    product.location && product.location.lat && product.location.lng && (
                        
                            <Marker
                                key={product.id}
                                position={[parseFloat(product.location.lat), correctLongitude(parseFloat(product.location.lng))]}
                                icon={product.category === 'tours' ? customIcon2 : customIcon1} // Usa customIcon2 si deseas diferenciarlos
                            >
                            
                        
                            <Popup>
                                <div>
                                    <h5 className='title-marker'>{product.title}</h5>
                                    {product.thumbnail && product.thumbnail.length > 0 && (
                                        <div className='img-marker'>
                                            <img src={`${url}/products/${product.thumbnail[0]}`}  alt={product.title} style={{ width: '100px' }} />

                                        </div>
                                    )}
                                    <p className=" price-marker"><strong>{product.money}{product.price}</strong></p>
                                    <div className="ver-mas div-btn">
                                        <Link to={`/details?id=${product.id}`} className={` btn-card btn-primary `} >Ver Más</Link>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </>
    );
};

export default MapWithMarkers;