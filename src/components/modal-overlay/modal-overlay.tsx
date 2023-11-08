import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ({ onClose }) => (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div className={styles.overlay} onClick={onClose} />
);

export default ModalOverlay;
