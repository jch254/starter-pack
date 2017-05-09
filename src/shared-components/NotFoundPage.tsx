import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Blockquote,
  Container,
  PageHeader,
} from 'rebass';

const NotFoundPage: React.StatelessComponent<RouteComponentProps<any>> = () => (
  <Container mt={4} pt={4} pb={3} style={{ flex: '1 1 auto', width: '100%' }}>
    <PageHeader
      my={2}
      py={2}
      description="Sorry mate, that page does not exist"
      heading="404!"
    />
    <Blockquote source="J.R.R. Tolkien" href="">
      All that is gold does not glitter,<br />
      Not all those who wander are lost;<br />
      The old that is strong does not wither,<br />
      Deep roots are not reached by the frost.
    </Blockquote>
  </Container>
);

export default NotFoundPage;
