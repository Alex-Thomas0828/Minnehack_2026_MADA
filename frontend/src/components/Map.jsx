import { MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from "react-leaflet";

const MSP_CENTER = [44.9778, -93.2650];
export default function MendMap({ pins, onLocationSelect }) {
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={MSP_CENTER} 
        zoom={12} 
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />

        <MapClickHandler onMapClick={onLocationSelect} />
        
      </MapContainer>
    </div>
  );
}

function MapClickHandler({ onMapClick }){
  useMapEvents({
    click: (e) => {
      const {lat, lng} = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
}