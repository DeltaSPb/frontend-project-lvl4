import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import * as Yup from 'yup';
import routes from '../../routes';
import { modalInfoSelector } from '../../selectors/index';
import { hideModalWindow } from '../../features/modalWindow/modalWindowSlice';


const mapStateToProps = (state) => {
  const modalInfo = modalInfoSelector(state);
  return modalInfo;
};

const Edit = (props) => {
  const {
    isOpened, type, item, dispatch,
  } = props;
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const hideModal = () => dispatch(hideModalWindow());

  const formik = useFormik({
    initialValues: { channel: item.name },
    validationSchema: Yup.object().shape({
      channel: Yup.string()
        .trim()
        .min(1, 'This name is too short!')
        .max(16, 'This name is too long!')
        .required('name cannot be an empty string'),
    }),
    onSubmit: async (values, { setErrors }) => {
      const url = routes.channelPath(item.id);
      const attributes = { name: values.channel };
      const editedChannel = { data: { attributes } };
      try {
        await axios.patch(url, editedChannel);
        hideModal();
      } catch (e) {
        setErrors({ channel: e.message });
      }
    },
  });

  const formClass = cn({
    'form-control': true,
    'is-invalid': !!formik.errors.channel,
  });

  return (
    <Modal show={isOpened} onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t(type)}
        </p>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className={formClass}
              ref={inputRef}
              required
              name="channel"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.channel}
            />
            {formik.errors.channel ? <div className="d-block invalid-feedback">{formik.errors.channel}</div> : null}
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="Edit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps)(Edit);
