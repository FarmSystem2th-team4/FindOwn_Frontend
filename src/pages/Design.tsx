import React from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { Sidebar } from "../components/Design/Sidebar";
import { Section1 } from "../components/Design/section1";
import { Section2 } from "../components/Design/section2";

const Container = styled(Grid)`
  width: 100%;
  height: 100vh;
  display: flex;
  z-index: -1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `;


export const Design = () => {
  return (
  <Container xs={12}>
    <Sidebar />
    <Section1 />
    <Section2 />
  </Container>
  );
};
