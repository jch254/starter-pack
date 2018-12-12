import * as React from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Image,
  Message,
  Text,
} from 'rebass';
import { bindActionCreators, Dispatch } from 'redux';
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
    booksRequest: typeof booksRequest;
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
      <Container py={6} width={1} style={{ flex: 'auto' }}>
        <Heading pb={4} children="Books" />
        {
          error &&
          <Message theme="error">
            {`Error: ${JSON.stringify(error)}`}
          </Message>
        }
        <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
          {
            [...books]
              .map(([id, book]) => (
                <Card key={id} my={2} p={0} style={{ width: '309px', height: '610px' }} >
                  <a href={book.url} target="_blank" rel="noopener noreferrer">
                    <Image src={book.img} />
                  </a>
                  <Box p={2}>
                    <Heading fontSize={3}>
                      <a href={book.url} target="_blank" rel="noopener noreferrer">
                        {book.title}
                      </a>
                    </Heading>
                    <Text fontWeight="bold">{book.author}</Text>
                    <p className={styles.description}>
                      {book.description}
                    </p>
                  </Box>
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators({ booksRequest }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
