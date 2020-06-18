import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModalWindow } from '../slices/modalWindowSlice';
import { modalInfoSelector } from '../selectors/index';
import getModal from './modals/index';


const Modal = () => {
  const { type } = useSelector(modalInfoSelector);
  const dispatch = useDispatch();

  const hideModal = () => dispatch(hideModalWindow());

  if (!type) {
    return null;
  }

  const Component = getModal(type);
  return <Component onHide={hideModal} />;
};

export default Modal;
