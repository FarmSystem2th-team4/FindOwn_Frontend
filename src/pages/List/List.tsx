import {
  Container,
  Option,
  LightCare,
  NavService,
  ListContainer
} from './style';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import brightVersion from '../../assets/images/bright_version.svg';
import darkVersion from '../../assets/images/night_version.svg';
import { ExampleBox } from '../../components/ItemBox';
import Grid from '@mui/material/Grid';


export const List = () => {
  const navigate = useNavigate();
  const [ bright, setBright ] = useState(true);
  const toggleBright = () => {
    setBright(!bright);
  };
  const Items = Array(5).fill(0);
  return(
    <Container>
      <Option>
        <LightCare onClick={toggleBright} src={bright ? brightVersion : darkVersion} />
        <NavService onClick={() => navigate(`/trademark`)}>상표 판단 바로가기</NavService>
      </Option>
      <ListContainer>
        <Grid
          container
          spacing={2}
          columns={12}
          style={{width: 1200}}>
        {Array.from(Array(5)).map((_, index) => (
          <Grid item xs={4} sm={4} md={4} key={index} style={{ width: 'auto', display: 'flex', justifyContent: 'center'}}>
            <div onClick={()=>navigate(`/list/${index}`)} style={{cursor: 'pointer'}}>
              <ExampleBox />
            </div>
          </Grid>
        ))}
        </Grid>
      </ListContainer>
    </Container>
  );
};  