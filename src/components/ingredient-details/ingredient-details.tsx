import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { useSelector } from '../../hooks';
import styles from '../modal/modal.module.css';

type TItemType = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

const IngredientDetails: FC<object> = () => {
  const { id } = useParams();
  const data = useSelector((store) => store
    // eslint-disable-next-line no-underscore-dangle
    .ingredientsStore.ingredients.find((item: TItemType) => item._id === id));

  if (!data) {
    return (
      <div className="text text_type_main-medium">
        Ингредиент не найден
      </div>
    );
  }

  if (!id) {
    return (
      <div className={`${styles.orderDetails}`}>
        <div className={`${styles.spinner}`}>
          <MoonLoader
            color="rgb(133, 133, 173, 1)"
            cssOverride={{}}
            loading
            size={100}
            speedMultiplier={1}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.image}><img src={data.image_large} alt={data.name} /></div>
      <div className={`${styles.modalContent} mt-4`}>
        <p className="text text_type_main-medium">{data.name}</p>
      </div>
      <div className={`${styles.modalContent} mt-8 mb-15`}>
        <div className={`${styles.textData} mr-5 text text_type_main-default ${styles.flex}`}>
          Калории,ккал
          <br />
          <span
            className="text text_type_digits-default mt-2"
          >
            {data.calories}
          </span>
        </div>
        <div className={`${styles.textData} mr-5 text text_type_main-default ${styles.flex}`}>
          Белки, г
          <br />
          <span
            className="text text_type_digits-default mt-2"
          >
            {data.proteins}
          </span>
        </div>
        <div className={`${styles.textData} mr-5 text text_type_main-default ${styles.flex}`}>
          Жиры, г
          <br />
          <span
            className="text text_type_digits-default mt-2"
          >
            {data.fat}
          </span>
        </div>
        <div className={`${styles.textData} text text_type_main-default ${styles.flex}`}>
          Углеводы, г
          <br />
          <span
            className="text text_type_digits-default mt-2"
          >
            {data.carbohydrates}
          </span>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
