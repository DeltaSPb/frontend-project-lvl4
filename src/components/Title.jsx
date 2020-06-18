import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { currentChannelSelector } from '../selectors/index';


const Title = () => {
  const currentChannal = useSelector(currentChannelSelector);

  return (
    <Card.Header as="h5">{`#${currentChannal.name}`}</Card.Header>
  );
};

export default Title;
