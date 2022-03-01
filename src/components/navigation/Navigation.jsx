import React from 'react';
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarLinkContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLink, Logo, OpenLinksButton
} from './index';
import logoImg from './logo.jpg'
function Navigation() {
   
  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/signup"> sign up</NavbarLink>
            <NavbarLink to="/register"> register</NavbarLink>
            <NavbarLink to="/stock"> view stock </NavbarLink>
            <OpenLinksButton>
              &#8801;
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Logo src = {logoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      <NavbarExtendedContainer></NavbarExtendedContainer>
    </NavbarContainer>
  );
}

export default Navigation;
