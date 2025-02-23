import React, { useState } from "react";
import { GoogleMap, Marker} from "@react-google-maps/api";
import MapLayout from "../profile/maintenance/layout";

const containerStyle = {
  width: "100%",
  height: "200px",
};
const center = {
  lat: 30.0444, 
  lng: 31.2357, 
};


const RegisterMap = ({ setCoordinates, setFieldValue }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedLocation({ lat, lng });
    setCoordinates({ lat, lng });
    setFieldValue("latitude", lat);
    setFieldValue("longitude", lng);
  };

  const center = {
    lat: 30.0444,
    lng: 31.2357,
  };

  return (
    <MapLayout>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "200px" }}
        center={center}
        zoom={12}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <Marker
            position={selectedLocation}
            clickable
            draggable
            onDragEnd={(e) => handleMapClick(e)}
          />
        )}
      </GoogleMap>
    </MapLayout>
  );
};

export default RegisterMap;
