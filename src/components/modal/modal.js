import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";

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

Modal.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
}

export default Modal