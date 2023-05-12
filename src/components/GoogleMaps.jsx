import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  margin: "0 auto",
};

function GoogleMaps({ lat, lon }) {
  const center = {
    lat: lat,
    lng: lon,
  };
  const MAPS_KEY = import.meta.env.VITE_MAPS_KEY;
  return (
    <LoadScript googleMapsApiKey={MAPS_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

GoogleMaps.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
};

export default React.memo(GoogleMaps);
