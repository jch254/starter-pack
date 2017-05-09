import * as React from 'react';
import Loading from 'react-loading';
import { Flex } from 'reflexbox';

interface FullscreenLoaderProps {
  delay?: number;
}

const FullscreenLoader: React.StatelessComponent<FullscreenLoaderProps> = ({ delay }) => (
  <Flex auto align="center" justify="center">
    <Loading delay={delay} type="spinningBubbles" color="#111" /> 
  </Flex>
);

FullscreenLoader.defaultProps = {
  delay: 1000,
};

export default FullscreenLoader;
