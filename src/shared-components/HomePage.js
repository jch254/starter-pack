import React from 'react';
import {
  Heading,
  Banner,
  Container,
  Section,
  SectionHeader,
  Blockquote,
} from 'rebass';

import banner from './Banner.jpg';

const HomePage = () => (
  <div>
    <Banner
      style={{ minHeight: '75vh', backgroundAttachment: 'scroll' }}
      backgroundImage={banner}
      m={0}
    >
      <Heading size={1} big>
        Starter Pack
      </Heading>
      <Heading size={2}>
        React + Redux + Auth0
      </Heading>
      <Heading size={3} style={{ paddingTop: '12px' }}>
        <a
          href="https://github.com/jch254/starter-pack"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: '#fff' }}
        >
          View on Github
        </a>
      </Heading>
    </Banner>
    <Container pb={3}>
      <Section pb={0}>
        <SectionHeader heading="About" />
        <p style={{ fontSize: '20px' }}>
          <a href="https://github.com/jch254/starter-pack" target="_blank" rel="noopener noreferrer">Starter Pack </a>
          combines <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer">React</a>, <a
            href="https://github.com/reactjs/redux"
            target="_blank"
            rel="noopener noreferrer"
          >Redux</a> and <a href="https://github.com/yelouafi/redux-saga" target="_blank" rel="noopener noreferrer">
          Redux-saga</a> with <a href="https://github.com/auth0/lock" target="_blank" rel="noopener noreferrer">
          Auth0&#39;s Lock</a> as a starting point for modern web apps with solid authentication.
          Why reinvent the wheel? The app utilises <a
            href="https://github.com/jxnblk/rebass"
            target="_blank"
            rel="noopener noreferrer"
          >Rebass</a> and <a
            href="https://github.com/jxnblk/reflexbox"
            target="_blank"
            rel="noopener noreferrer"
          >Reflexbox</a> to keep things looking decent. I built this as a way to quickly prototype
          new ideas.
        </p>
        <p style={{ fontSize: '20px' }}>
          Webpack (ft. various loaders/plugins/tools) is used to run a local development server and build
          the production version. <a
            href="https://webpack.js.org/guides/code-splitting"
            target="_blank"
            rel="noopener noreferrer"
          >Code splitting</a> (with <a
            href="https://webpack.js.org/guides/caching"
            target="_blank"
            rel="noopener noreferrer"
          >long-term caching</a> in the production version) has been set
          up via Webpack and React Loadable. Webpack&#39;s CommonsChunkPlugin is used to split vendor code.
          React Loadable is used for async component-centric code splitting and loading - see LoadableBooksPage.js
          as an example of creating a split point. ExtractTextPlugin is used to split CSS. HtmlWebpackPlugin is
          used to generate an index.html with the appropriate output assets injected, the Webpack manifest is
          inlined into index.html to save requests.
        </p>
        <p style={{ fontSize: '20px' }}>
          The app contains a <a href="https://starter-pack.603.nz/books">&#39;locked down&#39; Books page</a> which
          requires a user to log in/sign up before content will be visible. The data is read from a
          local JSON file as this is a only demonstration/starting point. In the real world data
          would be fetched from an API (see apiService.js). The API should check
          validity of the JWT token and return unauthorised if invalid. The app would then prompt
          the user to log in again. See <a href="https://serverless-api.603.nu">Serverless API</a> for
          a more detailed example of authentication in action.
        </p>
        <p style={{ fontSize: '20px', marginBottom: '0px' }}>
          I&#39;ve also created a <a
            href="https://github.com/jch254/starter-pack/tree/typescript"
            target="_blank"
            rel="noopener noreferrer"
          >branch</a> that utilises <a
            href="https://www.youtube.com/watch?v=V1po0BT7kac"
            target="_blank"
            rel="noopener noreferrer"
          >TypeScript for type checking</a> and transpliation to browser-friendly ES5 JavaScript.
        </p>
      </Section>
      <Section pb={0}>
        <SectionHeader heading="Technologies Used" />
        <ul style={{ fontSize: '20px', marginBottom: '0px' }}>
          <li>
            <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer">React</a>
          </li>
          <li>
            <a href="https://github.com/reactjs/redux" target="_blank" rel="noopener noreferrer">Redux</a>
          </li>
          <li>
            <a href="https://github.com/yelouafi/redux-saga" target="_blank" rel="noopener noreferrer">
              Redux Saga
            </a>
          </li>
          <li>
            <a href="https://github.com/auth0/lock" target="_blank" rel="noopener noreferrer">Auth0 Lock</a>
          </li>
          <li>
            <a href="https://github.com/facebook/immutable-js" target="_blank" rel="noopener noreferrer">
              Immutable.js
            </a>
          </li>
          <li>
            <a href="https://github.com/ReactTraining/react-router" target="_blank" rel="noopener noreferrer">
              React Router
            </a>
          </li>
          <li>
            <a href="https://github.com/reactjs/reselect" target="_blank" rel="noopener noreferrer">Reselect</a>
          </li>
          <li>
            <span>
              <a href="https://github.com/jxnblk/rebass" target="_blank" rel="noopener noreferrer">Rebass</a>
              &nbsp;&&nbsp;
              <a href="https://github.com/jxnblk/reflexbox" target="_blank" rel="noopener noreferrer">Reflexbox</a>
            </span>
          </li>
          <li>
            <a href="https://github.com/thejameskyle/react-loadable" target="_blank" rel="noopener noreferrer">
              React Loadable
            </a>
          </li>
          <li>
            <a href="https://github.com/webpack/webpack" target="_blank" rel="noopener noreferrer">Webpack</a>
          </li>
          <li>
            <a href="https://github.com/nodejs/node" target="_blank" rel="noopener noreferrer">Node.js</a>
          </li>
        </ul>
      </Section>
      <Section pb={0}>
        <Blockquote mt={3} source="Ryan Holiday">
          Never rattled. Never frantic. Always hustling and acting with creativity. Never anything
          but deliberate. Never attempting to do the impossible - but everything up to that line.
        </Blockquote>
      </Section>
    </Container>
  </div>
);

export default HomePage;
