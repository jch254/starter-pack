import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { NavLink } from 'react-router-dom';
import {
  NavItem,
  Space,
  Fixed,
  Toolbar,
  Button,
  Dropdown,
  DropdownMenu,
  Arrow,
} from 'rebass';

const activeStyle = {
  color: '#111',
};

const Navbar = ({ profile, handleLogin, handleLogout, onToggleDropdown, isDropdownOpen }) => (
  <Fixed top left right zIndex={1}>
    <Toolbar backgroundColor="#fff">
      <NavItem is="object">
        <NavLink to="/" exact activeStyle={activeStyle}>
          Home
        </NavLink>
      </NavItem>
      {
        profile &&
        <NavItem is="object">
          <NavLink to="/books" activeStyle={activeStyle}>
            Books
          </NavLink>
        </NavItem>
      }
      <Space auto />
      <NavItem is="object">
        {
          !profile ?
            <Button onClick={handleLogin} backgroundColor="green">
              Login
            </Button> :
            <Dropdown>
              <NavItem color="black" onClick={onToggleDropdown}>
                {profile.get('name')}
                <Arrow />
              </NavItem>
              <DropdownMenu
                right
                onDismiss={onToggleDropdown}
                open={isDropdownOpen}
              >
                <NavItem onClick={handleLogout}>
                  Logout
                </NavItem>
              </DropdownMenu>
            </Dropdown>
        }
      </NavItem>
    </Toolbar>
  </Fixed>
);

Navbar.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  onToggleDropdown: PropTypes.func.isRequired,
  profile: ImmutablePropTypes.map,
};

Navbar.defaultProps = {
  profile: null,
};

export default Navbar;
