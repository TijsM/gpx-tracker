import React, { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState();

  const selectFile = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    const url = process.env.REACT_APP_BACKEND_ENDPOINT + "/uploadRoute";

    const formData = new FormData();
    formData.append("gpx", file);

    const res = await fetch(url, {
      method: "POST",
      headers: {},
      body: formData,
    });

    console.log('res', await res.json())
  };

  return (
    <div>
      <input
        type="file"
        name="gpxFile"
        onChange={(event) => selectFile(event)}
      />
      {file && <button onClick={() => uploadFile()}>send to backend</button>}
    </div>
  );
}
