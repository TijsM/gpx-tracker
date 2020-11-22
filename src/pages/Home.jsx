import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import FileUpload from "../components/FileUpload"

const Button = styled.button`
  padding: 10px;
`;

const ButtonContainer = styled.div`
  margin: auto;
`;
export default function Home() {
  const history = useHistory();
  return (
    <div>
      hi there, i'm the home page
      <ButtonContainer>
        <Button onClick={() => history.push("/map")}>go to nav</Button>
      </ButtonContainer>
      <FileUpload/>
    </div>
  );
}
