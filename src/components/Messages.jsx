import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { UserContext } from '../utils';
import { messagesSelector } from '../selectors/index';


const mapStateToProps = (state) => {
  const messages = messagesSelector(state);
  return { messages };
};

const Messages = (props) => {
  const { messages } = props;
  const currentUser = useContext(UserContext);

  return (
    <Card.Body className="overflow-auto d-flex flex-column-reverse">
      <div className="messages-container">
        { messages.map(({
          id, text, time, owner,
        }) => {
          const messageStyle = currentUser === owner
            ? ({ position: 'end', color: 'secondary' })
            : ({ position: 'start', color: 'primary' });

          return (
            <div key={id} className={`order-1 d-flex justify-content-${messageStyle.position} mb-4`}>
              <div className="msg-cotainer">
                <p className={`text-white rounded-pill bg-${messageStyle.color} p-2 m-0`}>{text}</p>
                <span className="font-weight-light small">{`${owner} - ${time}, Today`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card.Body>
  );
};

export default connect(mapStateToProps)(Messages);
