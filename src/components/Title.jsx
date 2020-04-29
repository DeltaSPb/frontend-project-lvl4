import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { currentChannelSelector } from '../selectors/index';

const mapStateToProps = (state) => {
  const currentChannal = currentChannelSelector(state);
  return { currentChannal };
};

const Title = ({ currentChannal }) => (
  <Card.Header as="h5">{`#${currentChannal.name}`}</Card.Header>
);

export default connect(mapStateToProps)(Title);
