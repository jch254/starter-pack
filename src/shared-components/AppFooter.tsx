import * as React from 'react';
import * as moment from 'moment';
import { Box } from 'reflexbox';
import {
  Toolbar,
  Space,
  NavItem,
} from 'rebass';

const AppFooter: React.StatelessComponent<{}> = () => (
  <Box style={{ flex: 'none' }}>
    <Toolbar backgroundColor="white">
      <Space auto />
      <NavItem color="black" style={{ fontWeight: 'normal', fontSize: '12px' }}>
        <a href="https://603.nu" style={{ cusor: 'pointer' }}>
          {`© 603.nu ${moment().year()}`}
        </a>
      </NavItem>
    </Toolbar>
  </Box>
);

export default AppFooter;
