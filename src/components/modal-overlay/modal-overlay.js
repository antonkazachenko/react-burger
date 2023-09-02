import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({children, onClose}) => {
  return (
    <div className={`${styles.overlay}`} onClick={onClose}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;