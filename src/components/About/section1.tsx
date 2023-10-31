import React from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import image from "../../assets/images/Search engines-bro.png";
import { StyleButton } from "./StyleButton";

const Container = styled(Grid)`
  height: 100vh;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 70px;
  color: #0ac153;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  text-align: left;

  span.highlight {
    font-weight: bold;
  }

  @media (max-width: 1500px) {
    font-size: 40px;
  }
`;

const TextBox = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  hight: 100%;
  padding-left: 30px;
`;

const Image = styled.div`
  background-image: url(${image});
  background-size: cover;
  width: 900px;
  height: 600px;
`;

function Section1() {
  return (
    <Container container xs>
      <Grid container>
        <TextBox item xl={6} lg={6}>
          <Text>
            <span className="highlight">
              {"상표권 관련 최신 이슈 및 주요 개념"}
            </span>
          </Text>
          <Text>FindOwn 콘텐츠를 통해 </Text>
          <Text>상표권 관련 지식 및 트렌드를 알아봐요 ! </Text>
          <StyleButton />
        </TextBox>
        <TextBox item xl={6} lg={6}>
          <Image />
        </TextBox>
      </Grid>
    </Container>
  );
}

export default Section1;