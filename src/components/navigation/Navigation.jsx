import React from 'react';
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarLinkContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
} from './index';
import logoImg from './logo.jpg';

function Navigation() {
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/signin"> Sign In</NavbarLink>
            <NavbarLink to="/register"> Register</NavbarLink>
            <NavbarLink to="/dashboard"> Dashboard </NavbarLink>
            <OpenLinksButton>&#8801;</OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src={logoImg} />
        </RightContainer>
      </NavbarInnerContainer>
      <NavbarExtendedContainer />
    </NavbarContainer>
  );
}

export default Navigation;
