import React from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({children, onClose}) => {
  return (
    <div className={`${styles.overlay}`} onClick={onClose}>
      {children}
    </div>
  );
}

export default ModalOverlay;