import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const modalRoot = document.getElementById("react-modals");

const Modal = ({data, onClose, isCheckout}) => {

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose}/>
        {!isCheckout ? <IngredientDetails data={data} onClose={onClose} /> :
          <OrderDetails onClose={onClose} />}
      </>
    ),
    modalRoot
  );
}

export default Modal