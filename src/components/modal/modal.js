import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";

const modalRoot = document.getElementById("react-modals");

const Modal = ({data, onClose}) => {

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose}/>

        { !data.isCheckout ? <IngredientDetails data={data} onClose={onClose}/> : null }
      </>
    ),
    modalRoot
  );
}

export default Modal