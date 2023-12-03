import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

type TModalProp = {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerClass: string;
}

const Modal: FC<TModalProp> = ({
  onClose, title, className, children, headerClass,
}) => {
  const { number } = useParams();
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
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={title ? onClose : handleClose} />
        <div className={`${styles.modal} ${className}`}>
          <div className={headerClass}>
            {
              (number !== undefined) ? (
                <h2 className="text text_type_digits-default">{`#${number}`}</h2>
              )
                : <h2 className="text text_type_main-large">{title}</h2>
            }
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <a onClick={handleClose}><CloseIcon type="primary" /></a>
          </div>
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
};

export default Modal;
