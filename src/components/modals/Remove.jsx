import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import routes from '../../routes';
import { modalInfoSelector } from '../../selectors/index';
import { hideModalWindow } from '../../features/modalWindow/modalWindowSlice';


const mapStateToProps = (state) => {
  const modalInfo = modalInfoSelector(state);
  return modalInfo;
};

const Remove = (props) => {
  const {
    isOpened, type, item, dispatch,
  } = props;
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  const hideModal = () => dispatch(hideModalWindow());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = routes.channelPath(item.id);
    try {
      await axios.delete(url);
      hideModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal show={isOpened} onHide={() => hideModal()}>
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

export default connect(mapStateToProps)(Remove);
