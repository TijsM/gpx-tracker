import React, { useState } from "react";
import ReactMapGl from "react-map-gl";

export default function Map() {
  const [viewport, setViewport] = useState({
    longitude: 45,
    latitude: 45,
    zoom: 10,
  });

  return (
    <ReactMapGl
      width="100vw"
      height="100vh"
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={vp => setViewport(vp)}
    >
      lines here
    </ReactMapGl>
  );
}
