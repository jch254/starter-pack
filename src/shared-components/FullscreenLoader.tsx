import * as React from 'react';
import Loading from 'react-loading';
import { Flex } from 'rebass';

interface FullscreenLoaderProps {
  delay?: number;
  style?: any;
}

const FullscreenLoader = ({ delay, style = {} }: FullscreenLoaderProps) => (
  <Flex alignItems="center" justifyContent="center" style={{ flex: 'auto', ...style }}>
    <Loading delay={delay} type="spinningBubbles" color="#111" />
  </Flex>
);

FullscreenLoader.defaultProps = {
  delay: 1000,
};

export default FullscreenLoader;
