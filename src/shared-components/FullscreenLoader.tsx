import * as React from 'react';
import Loading from 'react-loading';
import { Box, Flex } from 'reflexbox';

interface FullscreenLoaderProps {
  delay?: number;
}

const FullscreenLoader: React.StatelessComponent<FullscreenLoaderProps> = ({ delay }) => (
  <Flex align="center" justify="center" style={{ flex: '1 0 auto' }} >
    <Box pt={4}>
      <Loading delay={delay} type="spinningBubbles" color="#111" />
    </Box>
  </Flex>
);

FullscreenLoader.defaultProps = {
  delay: 1000,
};

export default FullscreenLoader;
