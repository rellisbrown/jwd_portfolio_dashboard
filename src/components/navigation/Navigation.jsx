import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
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
import FinanceIcon from './FinanceIcon';
import { DataContext } from '../../utils/DataContext';

function Navigation() {
  const context = useContext(DataContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    context.signOut();
  };

  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <FinanceIcon style={{ marginLeft: '3rem' }} />
          <NavbarLinkContainer>
            {/* <NavbarLink to="/signin"> Sign In</NavbarLink>
            <NavbarLink to="/register"> Register</NavbarLink> */}
            <NavbarLink to="/dashboard"> JWD Finance Dashboard </NavbarLink>
            <OpenLinksButton>&#8801;</OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              {context.userDetails.name ? (
                <Avatar>{context.userDetails.name[0]}</Avatar>
              ) : (
                <Avatar />
              )}
            </IconButton>
          </Tooltip>
          {/* <Logo src={logoImg} /> */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </RightContainer>
      </NavbarInnerContainer>
      <NavbarExtendedContainer />
    </NavbarContainer>
  );
}

export default Navigation;
