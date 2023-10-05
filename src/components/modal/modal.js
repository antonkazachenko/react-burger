import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        props.onClose({data: null, isCheckout: false});
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [props]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={props.onClose}/>
        <div className={`${styles.modal} ${props.className}`}>
          {props.children}
        </div>
      </>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal