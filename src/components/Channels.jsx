import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeChannel } from '../features/channels/channelsSlice';
import { getChannels } from '../selectors/index';


const mapStateToProps = (state) => {
  const channels = getChannels(state);
  return { channels };
};


const Channels = (props) => {
  const { channels, dispatch } = props;

  const handleChange = (id) => () => dispatch(changeChannel({ id }));

  if (channels.length === 0) {
    return null;
  }

  return (
    <Nav className="flex-column">
      {channels.map(({ id, name }) => <Nav.Link onClick={handleChange(id)} key={id} className="text-white">{`#${name}`}</Nav.Link>)}
    </Nav>
  );
};

export default connect(mapStateToProps)(Channels);
