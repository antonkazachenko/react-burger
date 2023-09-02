import React from "react";
import styles from "../modal/modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";


const IngredientDetails = ({data, onClose}) => {
  return (
    <div className={styles.modal}>
      <div className={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
        <a onClick={onClose}><CloseIcon type="primary"/></a>
      </div>
      <div className={styles.image}><img src={data.image_large} alt={data.name}/></div>
      <div className={`${styles.modalContent} mt-4`}>
        <p className="text text_type_main-medium">{data.name}</p>
      </div>
      <div className={`${styles.modalContent} mt-8 mb-15`}>
        <div className={`${styles.textData} mr-5 text text_type_main-default`}>Калории,ккал<br/><span
          className="text text_type_digits-default">{data.calories}</span></div>
        <div className={`${styles.textData} mr-5 text text_type_main-default`}>Белки, г<br/><span
          className="text text_type_digits-default">{data.proteins}</span>
        </div>
        <div className={`${styles.textData} mr-5 text text_type_main-default`}>Жиры, г<br/><span
          className="text text_type_digits-default">{data.fat}</span></div>
        <div className={`${styles.textData} text text_type_main-default`}>Углеводы, г<br/><span
          className="text text_type_digits-default">{data.carbohydrates}</span></div>
      </div>
    </div>
  )
}

export default IngredientDetails;