import * as React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardImage,
  Container,
  Heading,
  Message,
  PageHeader,
  Text,
} from 'rebass';
import { bindActionCreators, Dispatch } from 'redux';
import { Flex } from 'reflexbox';

import { ResponseError } from '../apiService';
import { getIdToken } from '../auth/selectors';
import { GlobalState } from '../rootReducer';
import FullscreenLoader from '../shared-components/FullscreenLoader';

import Book from './Book';
import { booksRequest } from './reducer';
import { getError, getIsFetching, getSortedBooks } from './selectors';

const styles = require('./BooksPage.css');

interface StateProps {
  idToken?: string;
  books: Map<string, Book>;
  isFetching: boolean;
  error?: ResponseError;
}

interface DispatchProps {
  actions: {
    booksRequest: typeof booksRequest,
  };
}

class BooksPage extends React.PureComponent<StateProps & DispatchProps, {}> {
  componentDidMount() {
    const { idToken, actions } = this.props;

    if (idToken) {
      actions.booksRequest(idToken);
    }
  }

  render() {
    const { isFetching, books, error } = this.props;

    return isFetching ?
      <FullscreenLoader /> :
      <Container mt={4} pt={4} pb={3} style={{ flex: '1 1 auto', width: '100%' }}>
        <PageHeader my={2} py={2} description="All the books" heading="Books" />
        {
          error &&
          <Message theme="error">
            { `Error: ${JSON.stringify(error)}` }
          </Message>
        }
        <Flex align="center" justify="center" wrap gutter={2}>
          {
            [...books]
              .map(([id, book]) => (
                <Card key={id} m={2} style={{ width: '309px', height: '610px' }} >
                  <a href={book.url} target="_blank" rel="noopener noreferrer">
                    <CardImage src={book.img} />
                  </a>
                  <Heading level={3}>
                    <a href={book.url} target="_blank" rel="noopener noreferrer">
                      { book.title }
                    </a>
                  </Heading>
                  <Text bold>{book.author}</Text>
                  <p className={styles.description}>
                    { book.description }
                  </p>
                </Card>
            ))
          }
        </Flex>
      </Container>;
  }
}

const mapStateToProps = (state: GlobalState, ownProps: {}): StateProps => ({
  idToken: getIdToken(state),
  books: getSortedBooks(state),
  isFetching: getIsFetching(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  actions: bindActionCreators({ booksRequest }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
