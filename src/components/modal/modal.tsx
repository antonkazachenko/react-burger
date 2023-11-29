import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

type TModalProp = {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  orderFeed?: boolean;
}

const Modal: FC<TModalProp> = ({
  onClose, title, className, children, orderFeed,
}) => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const { createdOrder } = useSelector((store) => store.ingredientsStore);
  const handleClose = (): void => onClose();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [dispatch, onClose]);

  const renderHeaderContent = () => {
    if (title && !orderFeed) {
      return (
        <div className={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
          <h2 className="text text_type_main-large">{title}</h2>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <a onClick={onClose}><CloseIcon type="primary" /></a>
        </div>
      );
    } if (orderFeed) {
      // Content for orderFeed === true
      return (
        <div className={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
          <h2 className="text text_type_digits-default">{`#${number}`}</h2>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <a onClick={onClose}><CloseIcon type="primary" /></a>
        </div>
      );
    } if (createdOrder) {
      return (
        <div className={`${styles.exitCross} mr-10 mt-15`}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <a onClick={handleClose}><CloseIcon type="primary" /></a>
        </div>
      );
    }
    return <div className={`${styles.exitCross} mr-10 mt-15`} />;
  };

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={title ? onClose : handleClose} />
        <div className={`${styles.modal} ${className}`}>
          {renderHeaderContent()}
          {children}
        </div>
      </>
    ),
    modalRoot,
  );
};

Modal.defaultProps = {
  title: '',
  className: '',
  orderFeed: false,
};

export default Modal;
