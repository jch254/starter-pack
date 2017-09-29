import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Banner,
  Box,
  Container,
  Flex,
  Heading,
  Subhead,
  Text,
} from 'rebass';

const banner = require('./Banner.jpg');

const HomePage: React.StatelessComponent<RouteComponentProps<any>> = () => (
  <div>
    <Banner
      style={{ minHeight: '75vh', backgroundAttachment: 'scroll' }}
      backgroundImage={banner}
      m={0}
    >
      <Heading center color="white" f={8}>
        Starter Pack
      </Heading>
      <Subhead color="white">
        React + Redux + Auth0
      </Subhead>
      <Subhead f={3} pt={12} color="white">
        <a
          href="https://github.com/jch254/starter-pack/tree/typescript"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: 'white' }}
        >
          View on Github
        </a>
      </Subhead>
    </Banner>
    <Container py={5}>
      <Text f={4} width={[1, 1, 2 / 3]}>
        <a href="https://github.com/jch254/starter-pack/tree/typescript" target="_blank" rel="noopener noreferrer">
        Starter Pack</a> combines <a href="https://github.com/facebook/react" target="_blank"
        rel="noopener noreferrer">React</a>, <a href="https://github.com/reactjs/redux" target="_blank"
        rel="noopener noreferrer">Redux</a> and <a href="https://github.com/yelouafi/redux-saga" target="_blank"
        rel="noopener noreferrer">Redux-saga</a> with <a href="https://github.com/auth0/lock" target="_blank"
        rel="noopener noreferrer">Auth0&#39;s Lock</a> as a starting point for modern web apps with solid
        authentication. Why reinvent the wheel? The app utilises <a href="https://github.com/jxnblk/rebass"
        target="_blank" rel="noopener noreferrer">Rebass</a> to keep things looking decent. I built this
        as a way to quickly prototype new ideas.
      </Text>
      <Heading pt={5} pb={2} children="Technologies Used" />
      <Flex pb={5} wrap>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer">React</a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/reactjs/redux" target="_blank" rel="noopener noreferrer">Redux</a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/yelouafi/redux-saga" target="_blank" rel="noopener noreferrer">
              Redux Saga
            </a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/auth0/lock" target="_blank" rel="noopener noreferrer">Auth0 Lock</a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/ReactTraining/react-router" target="_blank" rel="noopener noreferrer">
              React Router
            </a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/jxnblk/rebass" target="_blank" rel="noopener noreferrer">Rebass</a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/thejameskyle/react-loadable" target="_blank" rel="noopener noreferrer">
              React Loadable
            </a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/reactjs/reselect" target="_blank" rel="noopener noreferrer">Reselect</a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/Microsoft/TypeScript" target="_blank" rel="noopener noreferrer">TypeScript</a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/nodejs/node" target="_blank" rel="noopener noreferrer">Node.js</a>
          </Text>
        </Box>
        <Box p={2} w={[1, 1 / 2, 1 / 4]}>
          <Text f={4}>
            <a href="https://github.com/webpack/webpack" target="_blank" rel="noopener noreferrer">Webpack</a>
          </Text>
        </Box>
      </Flex>
      <Text f={3} pb={2}>
        Webpack (ft. various loaders/plugins/tools) is used to run a local development server and build
        the production version. <a href="https://webpack.js.org/guides/code-splitting" target="_blank"
        rel="noopener noreferrer">Code splitting</a> (with <a href="https://webpack.js.org/guides/caching"
        target="_blank" rel="noopener noreferrer">long-term caching</a> in the production version) has been set
        up via Webpack and React Loadable. Webpack's CommonsChunkPlugin is used to split vendor code.
        React Loadable is used for async component-centric code splitting and loading - see LoadableBooksPage.tsx 
        as an example of creating a split point. ExtractTextPlugin is used to split CSS. HtmlWebpackPlugin is
        used to generate an index.html with the appropriate output assets injected, the Webpack manifest is
        inlined into index.html to save requests.
      </Text>
      <Text f={3} py={2}>
        The app contains a <Link to="/books">&#39;locked down&#39; Books page</Link> which
        requires a user to log in/sign up before content will be visible. The data is read from a
        local JSON file as this is a only demonstration/starting point. In the real world data
        would be fetched from an API (see apiService.ts). The API should check
        validity of the JWT token and return unauthorised if invalid. The app would then prompt
        the user to log in again. See <a href="https://serverless-api.603.nz">Serverless API</a> for
        a more detailed example of authentication in action.
      </Text>
      <Text f={3} py={2}>
        This branch utilises <a href="https://www.youtube.com/watch?v=V1po0BT7kac" target="_blank"
        rel="noopener noreferrer">TypeScript for type checking</a> and transpliation to
        browser-friendly ES5 JavaScript.
      </Text>
    </Container>
  </div>
);

export default HomePage;
