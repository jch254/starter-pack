import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Flex } from 'reflexbox';
import {
  PageHeader,
  Container,
  Message,
  Card,
  CardImage,
  HeadingLink,
  Text,
} from 'rebass';
import ImmutablePropTypes from 'react-immutable-proptypes';
import functional from 'react-functional';

import { booksRequest } from './reducer';
import { getSortedBooks, getError, getIsFetching } from './selectors';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import { selectors as authSelectors } from '../auth';

const BooksPage = ({ isFetching, books, error }) => (
  isFetching ?
    <FullscreenLoader /> :
    <Box style={{ flex: '1 0 auto' }}>
      <Container pt={4} pb={3}>
        <PageHeader my={2} py={2} description="All the books" heading="Books" />
        {
          error &&
          <Message theme="error">
            { `Error: ${JSON.stringify(error)}` }
          </Message>
        }
        <Flex align="center" justify="center" wrap gutter={2}>
          {
            books
              .entrySeq()
              .map(([id, book]) => (
                <Card key={id} m={2} style={{ width: '309px', height: '610px' }} >
                  <a href={book.url} target="_blank" rel="noopener noreferrer">
                    <CardImage src={book.get('img')} />
                  </a>
                  <HeadingLink level={3} href={book.get('url')} target="_blank" rel="noopener noreferrer">
                    { book.get('title') }
                  </HeadingLink>
                  <Text bold>{book.get('author')}</Text>
                  <Text small>
                    { book.get('description') }
                  </Text>
                </Card>
            ))
          }
        </Flex>
      </Container>
    </Box>
);

BooksPage.propTypes = {
  books: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

BooksPage.defaultProps = {
  error: null,
};

BooksPage.componentDidMount = ({ idToken, actions }) => actions.booksRequest(idToken);

const mapStateToProps = state => (
  {
    idToken: authSelectors.getIdToken(state),
    books: getSortedBooks(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ booksRequest }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(functional(BooksPage));
