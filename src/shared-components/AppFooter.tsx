import moment from 'moment';
import * as React from 'react';
import {
  Small,
  Toolbar,
} from './rebassCompat';

const AppFooter = () => (
  <Toolbar bg="white">
    <Small ml="auto">
      <a href="https://jch254.com" style={{ cursor: 'pointer', color: 'black' }}>
        {`© Jordan Hornblow ${moment().year()}`}
      </a>
    </Small>
  </Toolbar>
);

export default AppFooter;
