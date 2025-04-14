// LiveMap.js
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LiveMap = ({ pickup, destination ,ride , dest}) => {
  const [userPos, setUserPos] = useState(null);
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserPos([position.coords.latitude, position.coords.longitude]);
      },
      (err) => console.error("Live location error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  const center = pickup || destination || userPos || [28.6, 77.2];

  return (
    <div>
      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer center={center} zoom={13} style={{ height: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* User Live Location */}
          {!pickup && !destination && userPos && (
            <Marker position={userPos}>
              <Popup>Your Live Location</Popup>
            </Marker>
          )}

          {/* Pickup Marker */}
          {pickup && pickup[0] && pickup[1] && (
            <Marker position={pickup}>
              <Popup>{ride}</Popup>
            </Marker>
          )}

          {/* Destination Marker */}
          {destination && destination[0] && destination[1] && (
            <Marker position={destination}>
              <Popup>{dest}</Popup>
            </Marker>
          )}

          {/* Polyline (Route) */}
          {pickup && destination && (
            <Polyline positions={[pickup, destination]} color="blue" />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveMap;
