import React from 'react';
import { Flex } from 'reflexbox';
import {
  Heading,
  Banner,
  Container,
  Section,
  SectionHeader,
  Blockquote,
} from 'rebass';

const HomePage = () => (
  <Flex column style={{ flex: '1 0 auto' }}>
    <Banner
      style={{ minHeight: '75vh', backgroundAttachment: 'scroll' }}
      backgroundImage="https://img.jch254.com/Banner.jpg"
      m={0}
    >
      <Heading size={1} big>
        Starter Pack
      </Heading>
      <Heading size={2}>
        React + Redux + Auth0
      </Heading>
      <Heading size={3} pt={2}>
        <a
          href="https://github.com/jch254/starter-pack"
          target="_blank"
          rel="noreferrer noopener"
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
            href="https://github.com/reactjs/redux" target="_blank" rel="noopener noreferrer"
          >Redux</a> and <a href="https://github.com/yelouafi/redux-saga" target="_blank" rel="noopener noreferrer">
          Redux-saga</a> with <a href="https://github.com/auth0/lock" target="_blank" rel="noopener noreferrer">
          Auth0&#39;s Lock</a> as a starting point for modern web apps with solid authentication.
          Why reinvent the wheel? The app utilises <a
            href="https://github.com/jxnblk/rebass"
            target="_blank"
            rel="noopener noreferrer"
          >Rebass</a> and <a
            href="https://github.com/jxnblk/reflexbox" target="_blank" rel="noopener noreferrer"
          >Reflexbox</a> to keep things looking decent. I built this as a way to quickly prototype
          new ideas.
        </p>
        <p style={{ fontSize: '20px', marginBottom: '0px' }}>
          The app contains a <a href="https://starter-pack.603.nu/books">&#39;locked down&#39; Books page</a> which
          requires a user to log in/sign up before content will be visible. The data is read from a
          local JSON file as this is a only demonstration/starting point. In the real world data
          would be fetched from an API (see apiService.js). The API should check
          validity of the JWT token and return unauthorised if invalid. The app would then prompt
          the user to log in again. See <a href="https://serverless-api.603.nu">Serverless API</a> for
          a more detailed example of authentication in action.
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
            <a href="https://github.com/reactjs/react-router" target="_blank" rel="noopener noreferrer">React Router</a>
          </li>
          <li>
            <a href="https://github.com/jxnblk/rebass" target="_blank" rel="noopener noreferrer">Rebass</a>
          </li>
          <li>
            <a href="https://github.com/jxnblk/reflexbox" target="_blank" rel="noopener noreferrer">Reflexbox</a>
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
  </Flex>
);

export default HomePage;
