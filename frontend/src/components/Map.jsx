import { MapContainer, TileLayer, Circle, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "./Sidebar";
import MapKey from "./MapKey";

const MSP_CENTER = [44.9778, -93.265];

// Green pin icon for service/supplier pins
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Parse a PostGIS POINT string like POINT(lng lat) into { lat, lng }
function parseLocation(location) {
  if (!location) return null;

  if (typeof location === "string" && location.length > 20) {
    try {
      const cleanHex = location.trim();
      const matches = cleanHex.match(/.{1,2}/g);
      if (!matches) return null;

      const bytes = matches.map(byte => parseInt(byte, 16));
      const buffer = new Uint8Array(bytes).buffer;
      const view = new DataView(buffer);
      
      const lng = view.getFloat64(9, true); 
      const lat = view.getFloat64(17, true);

      return { lat, lng };
    } catch (e) {
      console.error("Manual Hex parse failed:", e);
      return null;
    }
  }

  // Fallback: GeoJSON format
  if (typeof location === "object" && location.coordinates) {
    return { lat: location.coordinates[1], lng: location.coordinates[0] };
  }

  return null;
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
}

export default function MendMap({ pins, onLocationSelect, onPinClick }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <MapContainer center={MSP_CENTER} zoom={12} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {pins && pins.map((pin, index) => {
          const pos = parseLocation(pin.location);
          if (!pos) return null;

          if (pin.is_demander) {
            return (
              <Circle
                key={`help-${pin.help_id}`}
                center={[pos.lat, pos.lng]}
                radius={350}
                pathOptions={{
                  color: "#e53e3e",
                  fillColor: "#e53e3e",
                  fillOpacity: 0.25,
                  weight: 1.5,
                }}
                eventHandlers={{
                  click: () => onPinClick(pin),
                }}
              >
                <Popup>
                  <strong>{pin.name}</strong>
                  <br />
                  {pin.description}
                </Popup>
              </Circle>
            );
          }

          return (
            <Marker
              key={`service-${pin.service_id || index}`}
              position={[pos.lat, pos.lng]}
              icon={greenIcon}
              eventHandlers={{
                click: () => onPinClick(pin),
              }}
            >
              <Popup>
                <strong>{pin.name}</strong>
                <br />
                {pin.description}
              </Popup>
            </Marker>
          );
        })}

        <MapClickHandler onMapClick={onLocationSelect} />
      </MapContainer>
      <MapKey />
    </div>
  );
}