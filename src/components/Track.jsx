import React, { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";

export default function UserLocation() {
  const [gpxData, setGpxData] = useState();
  const [trackCoords, setTrackCoords] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_ENDPOINT + "/getTestRoute"
      );
      const data = await response.json();

      if (data.gpx.trk) {
        setGpxData(data.gpx.trk);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gpxData) {
      const coords = gpxData.trkseg.trkpt.map((el) => {
        const lat = parseFloat(el.lat, 10);
        const lon = parseFloat(el.lon, 10);
        return [lon, lat];
      });

      setTrackCoords({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
      });
    }
  }, [gpxData]);

  if (!gpxData) {
    return <div>loading</div>;
  }

  return (
    <div>
      {trackCoords && <Source id="route" type="geojson" data={trackCoords} />}
      <Layer
        id="route"
        type="line"
        source="route"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "#15ff00",
          "line-width": 6,
        }}
      />
    </div>
  );
}
