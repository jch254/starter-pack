import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Fixed,
  Label,
  Toolbar,
} from 'rebass';
import { authActions } from '../auth/reducer';

interface NavbarProps {
  profile?: auth0.Auth0UserProfile;
  handleLogin: typeof authActions.login.started;
  handleLogout: typeof authActions.logout;
}

const activeStyle = {
  color: '#111',
};

const Navbar: React.StatelessComponent<NavbarProps> = ({
  profile,
  handleLogin,
  handleLogout,
}) => (
    <Fixed top={0} left={0} right={0} z={1}>
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
            <Button ml="auto" bg="green" onClick={handleLogin} style={{ cursor: 'pointer' }}>
              Login
            </Button> :
            <Button ml="auto" bg="red" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Logout
            </Button>
        }
      </Toolbar>
    </Fixed>
  );

export default Navbar;
