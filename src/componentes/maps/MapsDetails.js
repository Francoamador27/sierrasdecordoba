import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const MapaItemsDetails = (props) => {
    let {location} = props;
    let{title} =props;
  const position =[location.lat,location.lng]
  delete L.Icon.Default.prototype._getIconUrl;
  
  L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

    return (
      <div style={{ width: '100%', height: '400px' }}>
   <MapContainer center={position} zoom={8} scrollWheelZoom={true}>
   <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position} >
      <Popup>
      {title}      </Popup>
    </Marker>
  </MapContainer>
      </div>
    );
  };