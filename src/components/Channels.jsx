import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav, Button, Row, Col,
} from 'react-bootstrap';
import cn from 'classnames';
import { changeChannel } from '../slices/channelsSlice';
import { showModalWindow } from '../slices/modalWindowSlice';
import { getChannels, getCurrentChannalId } from '../selectors/index';


const Channels = () => {
  const channels = useSelector(getChannels);
  const currentChannalId = useSelector(getCurrentChannalId);
  const dispatch = useDispatch();

  const showModal = (type, item) => dispatch(showModalWindow({ type, item }));
  const handleChangeChannel = (id) => dispatch(changeChannel({ id }));

  const renderChannel = ({ id, name, removable }) => {
    const classes = cn({
      'text-white': true,
      [`font-weight-${(id === currentChannalId) ? 'bold' : 'light'}`]: true,
      disabled: id === currentChannalId,
    });

    return (
      <Nav.Item key={id} className="px-2 py-1">
        <Row>
          <Col>
            <Nav.Link className={classes} onClick={() => handleChangeChannel(id)}>{`#${name}`}</Nav.Link>
          </Col>
          {removable && (
            <Col className="d-flex justify-content-end">
              <Button className="px-2 rounded-0 shadow-none" onClick={() => showModal('editing', { id, name })}>
                <i className="far fa-edit text-light" />
              </Button>
              <Button className="px-2 rounded-0 shadow-none" onClick={() => showModal('removing', { id, name })}>
                <i className="fas fa-trash text-light" />
              </Button>
            </Col>
          )}
        </Row>
      </Nav.Item>
    );
  };


  return (
    <>
      <h5 className="text-white p-3"><strong>Channels</strong></h5>
      <Nav className="flex-column">
        {channels.map(renderChannel)}
      </Nav>
      <Button className="text-left rounded-0 shadow-none w-100" onClick={() => showModal('creating')}>+ Create channel</Button>
    </>
  );
};

export default Channels;
