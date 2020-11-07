import React from "react";
import { Marker } from "react-map-gl";
import styled from "styled-components";

const LocationIndicator = styled.div`
  width: 25px;
  height: 25px;
  background-color: red;
  border-radius: 25px;
`;

export default function UserLocation({ longitude, latitude }) {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
    //   offsetLeft={-20}
    //   offsetTop={-10}
    >
      <LocationIndicator/>
    </Marker>
  );
}
