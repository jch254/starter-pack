import * as React from 'react';
import Loading from 'react-loading';
import { Flex } from 'rebass';

interface FullscreenLoaderProps {
  delay?: number;
}

const FullscreenLoader: React.StatelessComponent<FullscreenLoaderProps> = ({ delay }) => (
  <Flex align="center" justify="center" style={{ flex: 'auto' }}>
    <Loading delay={delay} type="spinningBubbles" color="#111" /> 
  </Flex>
);

FullscreenLoader.defaultProps = {
  delay: 1000,
};

export default FullscreenLoader;
