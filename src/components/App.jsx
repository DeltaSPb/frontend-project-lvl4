import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import Channels from './Channels';
import NewMessageForm from './NewMessageForm';
import Title from './Title';
import Messages from './Messages';
import Modal from './Modal';

const App = () => (
  <Container fluid>
    <Row>
      <Col className="col-md-3 col-xl-2 p-0 bg-primary">
        <Channels />
      </Col>
      <Col className="vh-100 p-0 m-0">
        <Card className="rounded-0 h-100">
          <Title />
          <Messages />
          <NewMessageForm />
          <Modal />
        </Card>
      </Col>
    </Row>
  </Container>
);

export default App;
