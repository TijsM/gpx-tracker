import React, { useEffect, useState } from "react";
import ReactMapGl from "react-map-gl";
import { Plugins } from "@capacitor/core";

import UserLocation from "./UserLocation";

export default function Map() {
  const { Geolocation } = Plugins;

  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 17,
  });
  const [userLocation, setUserLocation] = useState();
  const [hasPosition, setHasPosition] = useState(false);

  //update user location
  useEffect(() => {
    const startWatchLocation = async () => {
      Geolocation.watchPosition({}, (locationData) => {
        console.log("updated location", locationData);
        if (locationData) {
          setHasPosition(true);
          const oldVp = { ...userLocation };
          oldVp.longitude = locationData.coords.longitude;
          oldVp.latitude = locationData.coords.latitude;
          setUserLocation(oldVp);
        }
      });
    };

    startWatchLocation();
  }, []);


 // set the initial vieuwport
  useEffect(() => {
    const getCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log("latitude", coordinates.coords.latitude);
      console.log("longitude", coordinates.coords.longitude);

      const oldVp = { ...viewport };
      oldVp.longitude = coordinates.coords.longitude;
      oldVp.latitude = coordinates.coords.latitude;

      setViewport({ ...oldVp });
    };

    getCurrentPosition();
  }, []);

  return (
    <ReactMapGl
      width="100vw"
      height="100vh"
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={(vp) => setViewport(vp)}
    >
      {hasPosition && userLocation ? (
        <UserLocation
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        />
      ) : (
        "fetching location"
      )}
    </ReactMapGl>
  );
}
