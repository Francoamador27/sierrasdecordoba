import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import customIconUrl from '../marker/home.png';

export const MapaDetails = (props) => {
  const {location} = props;
  const {title} = props;
  const {addPosition} = props;
  const [position, setPosition] = useState();
  useEffect(() => {
    if (location && location.lat !== undefined && location.lng !== undefined) {
      const newPosition = [location.lat, location.lng];
      if (!position || newPosition[0] !== position[0] || newPosition[1] !== position[1]) {
        setPosition(newPosition);
      }
    }else{
      setPosition([-31.416124768205577,-424.18333053588873])
    }
  }, [location]);
  function ClickEvent({onClick}){
    useMapEvents({
      click:(e)=>{
        onClick(e.latlng)
        setPosition([e.latlng.lat,e.latlng.lng])
      addPosition([e.latlng.lat,e.latlng.lng])
      }
    })
  }
  delete L.Icon.Default.prototype._getIconUrl;
  
  L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
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
    return (
      <div style={{ width: '100%', height: '400px' }}>
        { position &&

   <MapContainer center={position} zoom={4} scrollWheelZoom={true}>
   <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position} icon={customIcon1} >
      <Popup>
      {title}      </Popup>
    </Marker>
    <ClickEvent onClick={posicion=> posicion}/>
  </MapContainer>
        }
      </div>
    );
  };