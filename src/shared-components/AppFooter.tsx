import * as moment from 'moment';
import * as React from 'react';
import {
  NavItem,
  Space,
  Toolbar,
} from 'rebass';

const AppFooter: React.StatelessComponent<{}> = () => (
  <Toolbar backgroundColor="white">
    <Space auto />
    <NavItem style={{ fontWeight: 'normal', fontSize: '12px' }}>
      <a href="https://603.nu" style={{ cusor: 'pointer', color: 'black' }}>
        {`© 603.nu ${moment().year()}`}
      </a>
    </NavItem>
  </Toolbar>
);

export default AppFooter;
