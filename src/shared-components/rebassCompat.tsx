import * as React from 'react';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from 'rebass';

export {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Text,
};

type PrimitiveProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
};

export const Container = ({ style, ...props }: PrimitiveProps) => (
  <Box
    mx="auto"
    px={3}
    width={1}
    maxWidth="1024px"
    style={style}
    {...props}
  />
);

export const Banner = ({ backgroundImage, style, ...props }: PrimitiveProps) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    style={{
      backgroundImage,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      ...style,
    }}
    {...props}
  />
);

export const Subhead = (props: PrimitiveProps) => (
  <Heading as="h3" fontWeight="normal" fontSize={5} {...props} />
);

export const Toolbar = (props: PrimitiveProps) => (
  <Flex alignItems="center" px={3} py={2} {...props} />
);

export const Fixed = (props: PrimitiveProps) => (
  <Box position="fixed" {...props} />
);

export const Label = (props: PrimitiveProps) => (
  <Text as="span" fontWeight="bold" {...props} />
);

export const Message = ({ theme, ...props }: PrimitiveProps) => (
  <Box
    p={3}
    my={2}
    bg={theme === 'error' ? '#fee' : '#eef'}
    color={theme === 'error' ? '#900' : '#003'}
    {...props}
  />
);

export const Small = (props: PrimitiveProps) => (
  <Text as="small" fontSize={1} {...props} />
);

export const Blockquote = (props: PrimitiveProps) => (
  <Box as="blockquote" fontStyle="italic" {...props} />
);
