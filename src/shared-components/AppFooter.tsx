import moment from 'moment';
import * as React from 'react';
import {
  Small,
  Toolbar,
} from './rebassCompat';

const AppFooter = () => (
  <Toolbar bg="white">
    <Small ml="auto">
      <a href="https://603.nz" style={{ cursor: 'pointer', color: 'black' }}>
        {`© 603.nz ${moment().year()}`}
      </a>
    </Small>
  </Toolbar>
);

export default AppFooter;
