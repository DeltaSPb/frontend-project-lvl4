import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Card, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import cn from 'classnames';
import connect from '../connect';
import routes from '../routes';
import { UserContext, getCurrentTime, validation } from '../utils';
import { getCurrentChannalId } from '../selectors/index';

const makeSubmit = (props) => async (values, { setSubmitting, setErrors, resetForm }) => {
  const { currentChannalId, owner } = props;
  const url = routes.channelMessagesPath(currentChannalId);
  const attributes = { text: values.message, owner, time: getCurrentTime() };
  const message = { data: { attributes } };
  try {
    await axios.post(url, message);
    setSubmitting(false);
    resetForm();
  } catch (e) {
    setErrors({ message: e.message });
    setSubmitting(false);
  }
};

const NewMessageForm = () => {
  const currentChannalId = useSelector(getCurrentChannalId);
  const owner = useContext(UserContext);
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: { message: '' },
    validateOnBlur: false,
    validationSchema: validation.message,
    onSubmit: makeSubmit({ currentChannalId, owner }),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.isSubmitting]);

  const formClass = cn({
    'is-invalid': !!formik.errors.message,
  });

  return (
    <Card.Footer>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <FormControl
            className={formClass}
            ref={inputRef}
            required
            name="message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.message}
            disabled={formik.isSubmitting}
            placeholder="Type your message here"
          />
          {formik.errors.message ? <div className="d-block invalid-feedback">{formik.errors.message}</div> : null}
        </FormGroup>
      </form>
    </Card.Footer>
  );
};

export default connect()(NewMessageForm);
