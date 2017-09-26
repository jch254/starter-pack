import React from 'react';
import moment from 'moment';
import {
  Toolbar,
  Space,
  NavItem,
} from 'rebass';

const AppFooter = () => (
  <Toolbar backgroundColor="white">
    <Space auto />
    <NavItem color="black" href="https://603.nz" style={{ fontWeight: 'normal', fontSize: '12px' }}>
      {`© 603.nz ${moment().year()}`}
    </NavItem>
  </Toolbar>
);

export default AppFooter;
