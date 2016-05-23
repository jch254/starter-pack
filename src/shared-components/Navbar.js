import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
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

const Navbar = ({ profile, handleLogin, handleLogout, toggleDropdown, dropdownOpen }) => (
  <Fixed top left right zIndex={1}>
    <Toolbar backgroundColor="black">
      <NavItem is="object" color="midgray">
        <IndexLink to="/" children="Home" />
      </NavItem>
      {
        profile &&
        <NavItem is="object" color="midgray">
          <Link to="/books" children="Books" />
        </NavItem>
      }
      <Space auto />
      <NavItem is="object">
        {
          !profile ?
            <Button onClick={ handleLogin } backgroundColor="green">
              Login
            </Button> :
            <Dropdown>
              <NavItem color="midgray" onClick={() => toggleDropdown()}>
                {profile.name}
                <Arrow />
              </NavItem>
              <DropdownMenu
                right
                onDismiss={() => toggleDropdown()}
                open={dropdownOpen}
              >
                <NavItem
                  onClick={() => handleLogout()}
                  children="Logout"
                />
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
  dropdownOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

export default Navbar;
