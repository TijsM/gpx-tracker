import React, { useEffect, useState } from "react";
import ReactMapGl from "react-map-gl";
import { Plugins } from "@capacitor/core";

export default function Map() {
  const { Geolocation } = Plugins;

  const [viewport, setViewport] = useState({
    longitude: 45,
    latitude: 45,
    zoom: 18,
  });

  useEffect(() => {
    const getCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log("latitude", coordinates.coords.latitude);
      console.log("longitude", coordinates.coords.longitude);

      const oldVp = {...viewport}
      oldVp.longitude = coordinates.coords.longitude
      oldVp.latitude = coordinates.coords.latitude

      setViewport({...oldVp})
    };

    getCurrentPosition()

  }, [Geolocation]);

  return (
    <ReactMapGl
      width="100vw"
      height="100vh"
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={(vp) => setViewport(vp)}
    >
      lines here
    </ReactMapGl>
  );
}
