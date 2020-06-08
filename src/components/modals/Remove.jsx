import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import connect from '../../connect';
import routes from '../../routes';
import { modalInfoSelector } from '../../selectors/index';


const makeSubmit = async ({ id, hideModalWindow, setError }) => {
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
    hideModalWindow();
  } catch (err) {
    setError(err.message);
  }
};

const Remove = (props) => {
  const { hideModalWindow } = props;
  const { isOpened, type, item } = useSelector(modalInfoSelector);
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    makeSubmit({ id: item.id, hideModalWindow, setError });
  };

  return (
    <Modal show={isOpened} onHide={hideModalWindow}>
      <Modal.Header closeButton>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t(type)}
        </p>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <input type="submit" className="btn btn-danger" name="remove" value="Yes, remove" />
          </FormGroup>
          {error ? <div className="d-block invalid-feedback">{error}</div> : null}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default connect()(Remove);
