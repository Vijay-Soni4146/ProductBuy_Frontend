import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import Nav from "./Nav";

// https://i.imghippo.com/files/gSgdW1720933769.png => LOGO UPLOADED URL
// https://www.imghippo.com/i/xSzGL1722160091.png
// https://i.imghippo.com/files/xSzGL1722160091.png

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img
          className="logo"
          src="./images/simplebuy-high-resolution-logo-transparent.png"
          alt="Logo"
        />
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 7rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 1rem;
  }
`;

export default Header;
