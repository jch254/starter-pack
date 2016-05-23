import React from 'react';
import { Box } from 'reflexbox';
import {
  PageHeader,
  Blockquote,
  Container,
} from 'rebass';

const NotFoundPage = () => (
  <Box style={{ flex: '1 0 auto' }}>
    <Container pt={4} pb={3}>
      <PageHeader
        my={2}
        py={2}
        description="Sorry mate, that page does not exist"
        heading="404!"
      />
      <Blockquote source="J.R.R. Tolkien">
        All that is gold does not glitter,<br />
        Not all those who wander are lost;<br />
        The old that is strong does not wither,<br />
        Deep roots are not reached by the frost.
      </Blockquote>
    </Container>
  </Box>
);

export default NotFoundPage;
