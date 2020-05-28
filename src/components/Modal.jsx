import React from 'react';
import { connect } from 'react-redux';
import { modalInfoSelector } from '../selectors/index';
import getModal from './modals/index';

const mapStateToProps = (state) => {
  const modalInfo = modalInfoSelector(state);
  return modalInfo;
};

const Modal = (props) => {
  const { type } = props;

  if (!type) {
    return null;
  }

  const Component = getModal(type);
  return <Component />;
};

export default connect(mapStateToProps)(Modal);
