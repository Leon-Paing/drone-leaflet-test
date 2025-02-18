import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const droneIcon = icon({
  iconUrl: "droneIcon.png",
  iconSize: [100, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const generateRandomPosition = () => {
  return {
    lat: 55.7558 + (Math.random() - 0.5) * 0.1,
    lng: 37.6173 + (Math.random() - 0.5) * 0.1,
  };
};

const DroneMap = () => {
  const [drones, setDrones] = useState(
    Array.from({ length: 20 }, (_, i) => ({ id: i + 1, ...generateRandomPosition() }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDrones((prevDrones) =>
        prevDrones.map((drone) => ({ id: drone.id, ...generateRandomPosition() }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[55.7558, 37.6173]} zoom={14} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {drones.map((drone) => (
        <Marker 
          key={drone.id} 
          position={[drone.lat, drone.lng]} 
          icon={droneIcon}
          eventHandlers={{
            click: () => alert(`Drone ${drone.id} clicked!`),
          }}
        >
          <Popup>Drone ID: {drone.id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DroneMap;
