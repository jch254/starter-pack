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
import ImmutablePropTypes from 'react-immutable-proptypes';

const Navbar = ({ profile, handleLogin, handleLogout, onToggleDropdown, isDropdownOpen }) => (
  <Fixed top left right zIndex={1}>
    <Toolbar backgroundColor="black">
      <NavItem is="object" color="midgray">
        <IndexLink to="/">
          Home
        </IndexLink>
      </NavItem>
      {
        profile &&
        <NavItem is="object" color="midgray">
          <Link to="/books">
            Books
          </Link>
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
                <NavItem color="midgray" onClick={() => onToggleDropdown()}>
                  {profile.get('name')}
                  <Arrow />
                </NavItem>
                <DropdownMenu
                  right
                  onDismiss={() => onToggleDropdown()}
                  open={isDropdownOpen}
                >
                  <NavItem onClick={() => handleLogout()}>
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

export default Navbar;
