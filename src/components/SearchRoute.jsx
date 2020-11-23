import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SearchRoute() {
  const [searched, setSearched] = useState("");
  const [fetchedUrl, setFetchedUrl] = useState();

  const history = useHistory();

  const search = async () => {
    const url = process.env.REACT_APP_BACKEND_ENDPOINT + "/getRoute";
    setSearched("");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searched,
      }),
    });

    const route = await res.json();

    if (route) {
      setFetchedUrl({...route});
    }
  };

  const openMap = () => {
    history.push("/map", { route: fetchedUrl });
  };

  return (
    <div>
      <input
        onChange={(val) => setSearched(val.target.value)}
        value={searched}
      />
      <button onClick={() => search()}>SEARCH!</button>
      {fetchedUrl && <button onClick={() => openMap()}>load in map</button>}
    </div>
  );
}
