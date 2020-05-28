import React, { useContext, useRef } from 'react';
import {
  Field, Formik, Form, ErrorMessage,
} from 'formik';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import * as Yup from 'yup';
import routes from '../routes';
import { UserContext, getCurrentTime } from '../utils';
import { getCurrentChannalId } from '../selectors/index';


const mapStateToProps = (state) => {
  const currentChannalId = getCurrentChannalId(state);
  return { currentChannalId };
};

const NewMessageForm = ({ currentChannalId }) => {
  const owner = useContext(UserContext);
  const inputRef = useRef();

  return (
    <Card.Footer>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={Yup.object().shape({
          message: Yup.string()
            .trim()
            .required('cannot send an empty string'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
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
          } finally {
            inputRef.current.focus();
          }
        }}
      >
        {({ errors, isSubmitting }) => {
          const formClass = cn({
            'form-control': true,
            'is-invalid': !!errors.message,
          });

          return (
            <Form>
              <Field innerRef={inputRef} className={formClass} name="message" type="text" placeholder="Type your message here" disabled={isSubmitting} />
              <ErrorMessage component="div" className="d-block invalid-feedback" name="message" />
            </Form>
          );
        }}
      </Formik>
    </Card.Footer>
  );
};

export default connect(mapStateToProps)(NewMessageForm);
