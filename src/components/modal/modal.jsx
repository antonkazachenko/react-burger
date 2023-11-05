import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

function Modal(props) {
  const dispatch = useDispatch();
  const { createdOrder } = useSelector((store) => store.ingredientsStore);
  const handleClose = () => props.onClose();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        props.onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [dispatch, props]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={props.title ? props.onClose : handleClose} />
        <div className={`${styles.modal} ${props.className}`}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {props.title
            ? (
              <div className={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
                <h2 className="text text_type_main-large">{props.title}</h2>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <a onClick={props.onClose}><CloseIcon type="primary" /></a>
              </div>
            )
            : (
              createdOrder ? (
                <div className={`${styles.exitCross} mr-10 mt-15`}>
                  {/* eslint-disable-next-line max-len */}
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <a onClick={handleClose}><CloseIcon type="primary" /></a>
                </div>
              ) : (
                <div className={`${styles.exitCross} mr-10 mt-15`} />
              )
            )}
          {props.children}
        </div>
      </>
    ),
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Modal;