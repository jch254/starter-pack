import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Blockquote,
  Container,
  Flex,
  Heading,
} from 'rebass';

const NotFoundPage: React.StatelessComponent<RouteComponentProps<any>> = () => (
  <Flex column justify="center" style={{ flex: 'auto' }}>
    <Container>
      <Heading f={8}>404</Heading>
      <Heading>
        Sorry, that page does not exist
      </Heading>
      <Blockquote pt={2}>
        "All that is gold does not glitter,<br />
        Not all those who wander are lost;<br />
        The old that is strong does not wither,<br />
        Deep roots are not reached by the frost."
      </Blockquote>
    </Container>
  </Flex>
);

export default NotFoundPage;
