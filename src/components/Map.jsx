import React, { useEffect, useState } from "react";
import ReactMapGl from "react-map-gl";
import { Plugins } from "@capacitor/core";

export default function Map() {
  const { Geolocation } = Plugins;

  const [viewport, setViewport] = useState({
    longitude: 45,
    latitude: 45,
    zoom: 17,
  });
  const [hasPosition, setHasPosition] = useState(false);

  useEffect(() => {
    const startWatchLocation = async () => {
      Geolocation.watchPosition({}, (locationData) => {
        console.log("updated locaiton", locationData);
        if (locationData) {
          setHasPosition(true);
          const oldVp = { ...viewport };
          oldVp.longitude = locationData.coords.longitude;
          oldVp.latitude = locationData.coords.latitude;

          setViewport({ ...oldVp });
        }
      });
    };

    startWatchLocation();
  }, []);

  return (
    <ReactMapGl
      width="100vw"
      height="100vh"
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={(vp) => setViewport(vp)}
    >
      {hasPosition ? "location found" : "fetching location"}
    </ReactMapGl>
  );
}
