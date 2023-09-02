import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = ({children, name, onClose}) => {

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose}/>
        <div className={styles.modal}>
          <div className={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
            <a onClick={onClose}><CloseIcon type="primary"/></a>
          </div>
          <div className={styles.image}><img src={children.image_large} alt={name}/></div>
          <div className={`${styles.modalContent} mt-4`}>
            <p className="text text_type_main-medium">{name}</p>
          </div>
          <div className={`${styles.modalContent} mt-8 mb-15`}>
            <div className={`${styles.textData} mr-5 text text_type_main-default`}>Калории,ккал<br/><span
              className="text text_type_digits-default">{children.calories}</span></div>
            <div className={`${styles.textData} mr-5 text text_type_main-default`}>Белки, г<br/><span
              className="text text_type_digits-default">{children.proteins}</span>
            </div>
            <div className={`${styles.textData} mr-5 text text_type_main-default`}>Жиры, г<br/><span
              className="text text_type_digits-default">{children.fat}</span></div>
            <div className={`${styles.textData} text text_type_main-default`}>Углеводы, г<br/><span
              className="text text_type_digits-default">{children.carbohydrates}</span></div>
          </div>
        </div>
      </>
    ),
    modalRoot
  );
}

export default Modal