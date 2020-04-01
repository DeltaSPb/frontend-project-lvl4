import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  const { channels: { byId, allIds } } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels };
};

const Channels = (props) => {
  const { channels } = props;

  if (channels.length === 0) {
    return null;
  }

  return (
    <Nav className="flex-column">
      {channels.map(({ id, name }) => <Nav.Link key={id} className="text-white">{`#${name}`}</Nav.Link>)}
    </Nav>
  );
};

export default connect(mapStateToProps)(Channels);
