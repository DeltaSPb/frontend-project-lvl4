import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import Channels from './Channels';
import NewMessageForm from './NewMessageForm';
import Title from './Title';
import Messages from './Messages';

const App = () => (
  <Container fluid>
    <Row>
      <Col className="col-2 vh-100 p-0 bg-primary">
        <Channels />
      </Col>
      <Col className="vh-100 p-0 m-0">
        <Card className="rounded-0 h-100">
          <Title />
          <Messages />
          <NewMessageForm />
        </Card>
      </Col>
    </Row>
  </Container>
);

export default App;
