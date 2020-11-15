import React, { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import styled from "styled-components";

const TrackItem = styled.div`
  width: 10px;
  height: 10px;
  background-color: blue;
  border-radius: 10px;
`;

export default function UserLocation() {
  const [gpxTrack, setGpxTrack] = useState();

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_ENDPOINT);
    const fetchData = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/getTestRoute"
      );
      const data = await response.json();

      if (data.gpx.trk) {
        setGpxTrack(data.gpx.trk);
      }
    };

    fetchData();
  }, []);

  // console.log("track", gpxTrack)

  if (!gpxTrack) {
    return <div>loading</div>;
  }

  return (
    <div>
      {gpxTrack.trkseg.trkpt.map((element) => {
        const lat = parseFloat(element.lat, 10, )
        const lon = parseFloat(element.lon, 10)
        return (
          <Marker key={lat*lon} latitude={lat} longitude={lon}>
            <TrackItem />
          </Marker>
        );
      })}
    </div>
  );
}
