import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import cn from 'classnames';
import { validation } from '../../utils';
import connect from '../../connect';
import routes from '../../routes';
import { modalInfoSelector } from '../../selectors/index';


const makeSubmit = ({ hideModalWindow, id }) => async (values, { setErrors, setSubmitting }) => {
  const url = routes.channelPath(id);
  const attributes = { name: values.channel };
  const editedChannel = { data: { attributes } };
  try {
    await axios.patch(url, editedChannel);
    hideModalWindow();
  } catch (e) {
    setErrors({ channel: e.message });
    setSubmitting(false);
  }
};

const Edit = (props) => {
  const { hideModalWindow } = props;
  const { isOpened, type, item } = useSelector(modalInfoSelector);
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { channel: item.name },
    validationSchema: validation.channel,
    onSubmit: makeSubmit({ hideModalWindow, id: item.id }),
  });

  const formClass = cn({
    'is-invalid': !!formik.errors.channel,
  });

  return (
    <Modal show={isOpened} onHide={hideModalWindow}>
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
              disabled={formik.isSubmitting}
            />
            {formik.errors.channel ? <div className="d-block invalid-feedback">{formik.errors.channel}</div> : null}
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="Edit" disabled={formik.isSubmitting} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default connect()(Edit);
