import React from 'react';
import { Box } from 'reflexbox';
import Icon from 'react-geomicons';
import {
  Heading,
  Banner,
  Container,
  Section,
  SectionHeader,
  Blockquote,
} from 'rebass'

const HomePage = () => (
  <Box>
    <Banner
      style={{ minHeight: '75vh', backgroundAttachment: 'scroll' }}
      backgroundImage="http://img.jch254.com/Banner.jpg"
      m={0}
    >
      <Heading size={1} big children="Starter Pack" />
      <Heading size={2} children="React + Redux + Auth0" />
      <a href="https://github.com/jch254/starter-pack" target="_BLANK" style={{ paddingTop: '16px' }} >
        <Icon name="github" width="32px" height="32px" />
      </a>
    </Banner>
    <Container pb={3}>
      <Section pb={0}>
        <SectionHeader heading="About" href="#about" />
        <p style={{ fontSize: '20px' }}>
          <a href="https://github.com/jch254/starter-pack" target="_BLANK">Starter Pack </a>
          combines <a href="https://github.com/facebook/react" target="_BLANK">React</a>, <a
            href="https://github.com/reactjs/redux" target="_BLANK"
          >Redux</a> and <a href="https://github.com/yelouafi/redux-saga" target="_BLANK">
          Redux-saga</a> with <a href="https://github.com/auth0/lock" target="_BLANK">
          Auth0's Lock</a> as a starting point for modern web apps with solid authentication.
          Why reinvent the wheel? The app utilises <a href="https://github.com/jxnblk/rebass"
            target="_BLANK"
          >Rebass</a> and <a
            href="https://github.com/jxnblk/reflexbox" target="_BLANK"
          >Reflexbox</a> to keep things looking decent. I built this as a way to quickly prototype
          new ideas.
        </p>
        <p style={{ fontSize: '20px', marginBottom: '0px' }}>
          The app contains a <a href="http://sp.603.nu/books">'locked down' Books page</a> which
          requires a user to log in/sign up before content will be visible. The data is read from a
          local JSON file as this is a only demonstration/starting point. In the real world data
          would be fetched from external APIs (see externalApiService.js). The API should check
          validity of the JWT token and return unauthorised if invalid. The app would then prompt
          the user to log in again. This is the perfect companion for AWS Lambda/API Gateway-driven
          Node.js microservices.
        </p>
      </Section>
      <Section pb={0}>
        <SectionHeader heading="Technologies Used" href="#tech" />
        <ul style={{ fontSize: '20px', marginBottom: '0px' }}>
          <li><a href="https://github.com/facebook/react" target="_BANK">React</a></li>
          <li><a href="https://github.com/reactjs/redux" target="_BANK">Redux</a></li>
          <li><a href="https://github.com/yelouafi/redux-saga" target="_BANK">Redux Saga</a></li>
          <li><a href="https://github.com/auth0/lock" target="_BANK">Auth0 Lock</a></li>
          <li><a href="https://github.com/reactjs/react-router" target="_BANK">React Router</a></li>
          <li><a href="https://github.com/jxnblk/rebass" target="_BANK">Rebass</a></li>
          <li><a href="https://github.com/jxnblk/reflexbox" target="_BANK">Reflexbox</a></li>
          <li><a href="https://github.com/webpack/webpack" target="_BANK">Webpack</a></li>
          <li><a href="https://github.com/nodejs/node" target="_BANK">Node.js</a></li>
          <li>Few more tings...</li>
        </ul>
      </Section>
      <Section pb={0}>
        <Blockquote mt={3} source="Ryan Holiday">
          Never rattled. Never frantic. Always hustling and acting with creativity. Never anything
          but deliberate. Never attempting to do the impossible - but everything up to that line.
        </Blockquote>
      </Section>
    </Container>
  </Box>
);

export default HomePage;
