import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'react-loading';
import { Box, Flex } from 'reflexbox';

const FullscreenLoader = ({ delay }) => (
  <Flex align="center" justify="center" style={{ flex: '1 0 auto' }} >
    <Box pt={4}>
      <Loading delay={delay} type="spinningBubbles" color="#111" />
    </Box>
  </Flex>
);

FullscreenLoader.propTypes = {
  delay: PropTypes.number,
};

FullscreenLoader.defaultProps = {
  delay: 1000,
};

export default FullscreenLoader;
