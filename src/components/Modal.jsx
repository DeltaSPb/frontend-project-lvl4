import React from 'react';
import { useSelector } from 'react-redux';
import connect from '../connect';
import { modalInfoSelector } from '../selectors/index';
import getModal from './modals/index';


const Modal = () => {
  const { type } = useSelector(modalInfoSelector);

  if (!type) {
    return null;
  }

  const Component = getModal(type);
  return <Component />;
};

export default connect()(Modal);
