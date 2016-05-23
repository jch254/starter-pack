import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

import { booksRequest } from './actions';
import { getBooks, getError, getIsFetching } from './selectors';

import FullscreenLoader from '../shared-components/FullscreenLoader';
import { selectors as authSelectors } from '../auth';

class BooksPage extends Component {
  componentDidMount() {
    const { dispatch, idToken } = this.props;
    dispatch(booksRequest(idToken));
  }

  render() {
    const { isFetching, books, error } = this.props;

    return (
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
                books.map((b, index) =>
                  <Card key={index} m={2} width={309}>
                    <a href={b.url} target="_blank">
                      <CardImage src={b.img} />
                    </a>
                    <HeadingLink level={3} children={b.title} href={b.url} target="_blank" />
                    <Text bold>{b.author}</Text>
                    <Text small children={b.description} />
                  </Card>
                )
              }
            </Flex>
          </Container>
        </Box>
    );
  }
}

BooksPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  idToken: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    idToken: authSelectors.getIdToken(state),
    books: getBooks(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  };
};

export default connect(mapStateToProps)(BooksPage);
