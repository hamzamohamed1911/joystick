"use client";
import { LoadScript } from "@react-google-maps/api";

const MapLayout = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <main>{children}</main>
    </LoadScript>
  );
};

export default MapLayout;
