import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../hooks';
import styles from './non-modal-ingredient-page.module.css';
import TItemType from '../../types/ItemType';
import { useLanguage } from '../../utils/languageContext';

const NonModalIngredientPage: FC<object> = () => {
  const { t } = useLanguage();
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

  return (
    <>
      <div className={`mt-30 ${styles.flex}`}>
        <div className={`${styles.modalHeader} mt-10 ml-10 mr-10`}>
          <h2 className="text text_type_main-large">{t('ingredientDetails')}</h2>
        </div>
        <div><img src={data.image_large} alt={data.name} /></div>
        <div className={`${styles.modalContent} mt-4`}>
          <p className="text text_type_main-medium">{t(data.name)}</p>
        </div>
      </div>
      <div className={`${styles.modalContent} mt-8 mb-15`}>
        <div className={`${styles.textData} mr-5 text text_type_main-default ${styles.flex}`}>
          {t('calories')}
          <br />
          <span
            className="text text_type_digits-default mt-2"
          >
            {data.calories}
          </span>
        </div>
        <div className={`${styles.textData} mr-5 text text_type_main-default ${styles.flex}`}>
          {t('proteins')}
          <br />
          <span
            className="text text_type_digits-default mt-2"
          >
            {data.proteins}
          </span>
        </div>
        <div className={`${styles.textData} mr-5 text text_type_main-default ${styles.flex}`}>
          {t('fat')}
          <br />
          <span
            className="text text_type_digits-default mt-2"
          >
            {data.fat}
          </span>
        </div>
        <div className={`${styles.textData} text text_type_main-default ${styles.flex}`}>
          {t('carbohydrates')}
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

export default NonModalIngredientPage;
