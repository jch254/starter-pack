import React from 'react';
import PropTypes from 'prop-types';

import FullscreenLoader from './FullscreenLoader';

const ComponentLoader = ({ isLoading, pastDelay }) => (isLoading && pastDelay ? <FullscreenLoader delay={0} /> : null);

ComponentLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired,
};

export default ComponentLoader;
