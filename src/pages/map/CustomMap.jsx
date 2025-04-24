import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";

// Prevent Leaflet missing icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const serverURL = process.env.REACT_APP_SERVER_URL;
const socket = io(serverURL, { transports: ["websocket"] });

const MapUpdater = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 13, { animate: true }); // Update map center
    }
  }, [userLocation, map]);
  return null;
};

const DynamicMap = ({ role, userId, userName }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [trackedUsers, setTrackedUsers] = useState({});
  const defaultCenter = [20, 80]; // Default to India

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        // Send user location update to the server
        socket.emit("updateLocation", { userId, name: userName, location: { lat: latitude, lng: longitude } });
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      { enableHighAccuracy: true }
    );

    // Listen for updates from other users
    socket.on("usersLocation", (updatedUsers) => {
      setTrackedUsers(
        updatedUsers.reduce((acc, user) => ({ ...acc, [user.userId]: user }), {})
      );
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [userId, userName]);

  return (
    <>
      <MapContainer center={userLocation || defaultCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <MapUpdater userLocation={userLocation} /> */}

        {/* User Marker
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              Your Location <br /> Lat: {userLocation[0]}, Lng: {userLocation[1]}.
            </Popup>
          </Marker>
        )} */}

        {/* Tracked Users */}
        {Object.values(trackedUsers).map((user) => (
          <Marker key={user.userId} position={[user.location.lat, user.location.lng]}>
            <Popup>
              {user.name} <br /> Lat: {user.location.lat}, Lng: {user.location.lng}.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default DynamicMap;
