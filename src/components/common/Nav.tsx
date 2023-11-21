import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { MainLogo } from "./MainLogo";

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  height: 5vh;
  width: 100%;
  padding: 0 20px;
  background-color: rgba(238, 255, 237, 0.7);

  @media (max-width: 1500px) {
    padding: 0px;
  }
`;

const NavBarInner = styled.div`
  display: flex;
  margin: 0 auto;
  height: 100%;
  max-width: 1440px;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;

  @media (max-width: 1500px) {
    padding-right: 20px;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  font-size: 15px;
  text-decoration: none;
  padding: 0 10px;

  @font-face {
    font-family: "AppleBold";
    src: url("https://cdn.jsdelivr.net/gh/cho1n/Apollo-Frontend@latest/src/assets/fonts/AppleSDGothicNeoB.ttf")
      format("truetype");
  }

  font-family: "AppleBold";

  &:hover {
    text-decoration: underline;
    text-decoration-color: #52c07e;
    text-decoration-thickness: 2px;
    font-weight: bold;
    color: #52c07e;
    cursor: pointer;
  }
`;

export const Nav = () => {
  const ID = localStorage.getItem('Email');
  const reset = () => {
    localStorage.removeItem("Email");
  }
  return (
    <NavBarContainer>
      <NavBarInner>
        <MainLogo />
        <div style={{ display: 'flex', flexDirection: 'row'}} >
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/trademark">Service</StyledLink>
          <StyledLink to="/community">Community</StyledLink>
          {ID ? 
            <div style={{display:'flex'}}>
              <StyledLink to="/mypage">{ID}님</StyledLink>
              <StyledLink to="/" onClick={reset}>로그아웃</StyledLink>
            </div>
            : <StyledLink to="/login">LOGIN</StyledLink>
          }        
        </div>
      </NavBarInner>
    </NavBarContainer>
  );
};
