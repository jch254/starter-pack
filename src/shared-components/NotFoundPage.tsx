import * as React from 'react';
import {
  Blockquote,
  Container,
  Heading,
} from 'rebass';

const NotFoundPage = () => (
  <Container py={5} style={{ flex: 'auto' }}>
    <Heading fontSize={8}>404.</Heading>
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
);

export default NotFoundPage;
