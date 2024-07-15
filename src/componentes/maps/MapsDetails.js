import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getAllProducts } from '../utils.js/fetchs/getAllProducts';
import Swal from 'sweetalert2';
import customIconUrl from '../../marker/home.png';

export const MapaItemsDetails = (props) => {
  let { location } = props;
  let { title } = props;
  const position = [location.lat, location.lng]
  delete L.Icon.Default.prototype._getIconUrl;

  const customIcon1 = L.icon({

    iconRetinaUrl: customIconUrl,
    iconUrl: customIconUrl,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [40, 41], // tamaño del icono
    iconAnchor: [12, 41],
    popupAnchor: [1, -34], // punto desde donde debe abrirse el popup en relación con el icono
    shadowSize: [41, 41]
});
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <MapContainer center={position} zoom={8} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon1} >
          <Popup>
            {title}      </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};