import React from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { Sidebar } from "../components/Trademark/Sidebar";
import { Section1 } from "../components/Trademark/section1";
import { Section2 } from "../components/Trademark/section2";

const Container = styled(Grid)`
  width: 100%;
  height: 100vh;
  display: flex;
  z-index: -1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @font-face {
    font-family: "AppleBold";
    src: url("https://cdn.jsdelivr.net/gh/cho1n/Apollo-Frontend@latest/src/assets/fonts/AppleSDGothicNeoB.ttf")
      format("truetype");
  }

  font-family: "AppleBold";
`;

export const TradeMark = () => {
  return (
    <Container xs={12}>
      <Sidebar />
      <Section1 />
      <Section2 />
    </Container>
  );
};
