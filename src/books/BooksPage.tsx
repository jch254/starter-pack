import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useAuth0 } from '../auth/Auth0Wrapper';
import { GlobalState } from '../rootReducer';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import { booksActions } from './reducer';
import { getError, getIsFetching, getSortedBooks } from './selectors';

import styles from './BooksPage.css';

const BooksPage = () => {
  const { getTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const books = useSelector((state: GlobalState) => getSortedBooks(state));
  const isFetching = useSelector((state: GlobalState) => getIsFetching(state));
  const error = useSelector((state: GlobalState) => getError(state));

  React.useEffect(
    () => {
      const requestBooks = async () => {
        const token = await getTokenSilently();

        if (token) {
          dispatch(booksActions.fetchBooks.started(token));
        }
      };

      requestBooks();
    },
    [],
  );

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
};

export default BooksPage;
