import React, { useEffect, useState } from "react";
import ReactMapGl from "react-map-gl";
import { Plugins } from "@capacitor/core";

import UserLocation from "../components/UserLocation";
import Track from '../components/Track'

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
      Geolocation.watchPosition({enableHighAccuracy: false}, (locationData) => {
        console.log("updated location", locationData);
        if (locationData) {
          console.log('locationData', locationData)
          setHasPosition(true);
          const oldVp = { ...userLocation };
          oldVp.longitude = locationData.coords.longitude;
          oldVp.latitude = locationData.coords.latitude;
          setUserLocation(oldVp);
        }
      });
    };

    startWatchLocation();
  }, [Geolocation, userLocation]);


 // set the initial vieuwport
  useEffect(() => {
    const getCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy: true});

      const oldVp = { ...viewport };
      oldVp.longitude = coordinates.coords.longitude;
      oldVp.latitude = coordinates.coords.latitude;

      setViewport({ ...oldVp });
    };

    getCurrentPosition();
  }, [Geolocation, viewport]);

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
      <Track/>
    </ReactMapGl>
  );
}
