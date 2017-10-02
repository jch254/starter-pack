import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Fixed,
  Label,
  Toolbar,
} from 'rebass';

import { loginRequest, logout } from '../auth/reducer';

interface NavbarProps {
  profile?: auth0.Auth0UserProfile;
  handleLogin: typeof loginRequest;
  handleLogout: typeof logout;
}

const activeStyle = {
  color: '#111',
};

const Navbar: React.StatelessComponent<NavbarProps> = ({
  profile,
  handleLogin,
  handleLogout,
}) => (
  <Fixed top left right z={1}>
    <Toolbar bg="white">
      <NavLink to="/" exact activeStyle={activeStyle}>
        <Label mx={3} style={{ cursor: 'pointer' }}>
          Home
        </Label>
      </NavLink>
      {
        profile &&
        <NavLink to="/books" activeStyle={activeStyle}>
          <Label mx={3} style={{ cursor: 'pointer' }}>
            Books
          </Label>
        </NavLink>
      }
      {
        profile === undefined ?
          <Button ml="auto" bg="green4" onClick={handleLogin} style={{ cursor: 'pointer' }}>
            Login
          </Button> :
          <Button  ml="auto" bg="red4" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </Button>
      }
    </Toolbar>
  </Fixed>
);

export default Navbar;
