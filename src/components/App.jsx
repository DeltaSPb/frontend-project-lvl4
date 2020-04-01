import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Channels from './Channels';

const App = () => (
  <Container fluid>
    <Row>
      <Col className="col-2 vh-100 p-0 border-right bg-primary">
        <Channels />
      </Col>
      <Col />
    </Row>
  </Container>
);

export default App;
