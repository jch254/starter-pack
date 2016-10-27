import React, { PropTypes } from 'react';
import Loading from 'react-loading';
import { Box, Flex } from 'reflexbox';

const FullscreenLoader = ({ delay = 1000 }) => (
  <Flex align="center" justify="center" style={{ flex: '1 0 auto' }} >
    <Box pt={4}>
      <Loading delay={delay} type="spinningBubbles" color="#111" />
    </Box>
  </Flex>
);

FullscreenLoader.propTypes = {
  delay: PropTypes.number,
};

export default FullscreenLoader;
