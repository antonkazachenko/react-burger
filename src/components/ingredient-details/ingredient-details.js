import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from '../modal/modal.module.css';

function IngredientDetails() {
  const { id } = useParams();
  const data = useSelector((store) => store
    // eslint-disable-next-line no-underscore-dangle
    .ingredientsStore.ingredients.find((item) => item._id === id));
  return (
    <>
      <div className={styles.image}><img src={data.image_large} alt={data.name} /></div>
      <div className={`${styles.modalContent} mt-4`}>
        <p className="text text_type_main-medium">{data.name}</p>
      </div>
      <div className={`${styles.modalContent} mt-8 mb-15`}>
        <div className={`${styles.textData} mr-5 text text_type_main-default`}>
          Калории,ккал
          <br />
          <span
            className="text text_type_digits-default"
          >
            {data.calories}
          </span>
        </div>
        <div className={`${styles.textData} mr-5 text text_type_main-default`}>
          Белки, г
          <br />
          <span
            className="text text_type_digits-default"
          >
            {data.proteins}
          </span>
        </div>
        <div className={`${styles.textData} mr-5 text text_type_main-default`}>
          Жиры, г
          <br />
          <span
            className="text text_type_digits-default"
          >
            {data.fat}
          </span>
        </div>
        <div className={`${styles.textData} text text_type_main-default`}>
          Углеводы, г
          <br />
          <span
            className="text text_type_digits-default"
          >
            {data.carbohydrates}
          </span>
        </div>
      </div>
    </>
  );
}

export default IngredientDetails;
