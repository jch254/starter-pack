import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'react-loading';
import { Flex } from 'reflexbox';

const FullscreenLoader = ({ delay }) => (
  <Flex auto align="center" justify="center">
    <Loading delay={delay} type="spinningBubbles" color="#111" />
  </Flex>
);

FullscreenLoader.propTypes = {
  delay: PropTypes.number,
};

FullscreenLoader.defaultProps = {
  delay: 1000,
};

export default FullscreenLoader;
