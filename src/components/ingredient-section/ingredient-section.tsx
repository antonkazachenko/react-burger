import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ingredient-section.module.css';
import ConstructorCard from '../constructor-card/constructor-card';

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

type TIngredientSection = {
    items : Array<TItemType>;
    title: string;
    classes: Array<string>;
    handleModal: () => void;
}

const IngredientSection: FC<TIngredientSection> = ({
  items, title, classes, handleModal,
}) => {
  const location = useLocation();

  return (
    <>
      <p className="text text_type_main-medium ">
        {title}
      </p>
      <article className={`${styles.flex} mt-6`}>
        {
          items.map((el, index) => (
            <Link
              className={`${classes[index]} ${styles.navLink}`}
              /* eslint-disable-next-line no-underscore-dangle */
              key={el._id}
              /* eslint-disable-next-line no-underscore-dangle */
              to={`/ingredients/${el._id}`}
              state={{ backgroundLocation: location }}
            >
              <ConstructorCard
                onClick={handleModal}
                item={el}
                price={el.price}
                    /* eslint-disable-next-line no-underscore-dangle */
                key={el._id}
              />
            </Link>
          ))
        }
        {
          items.length % 2 !== 0
          && (
            <div className={`${classes[classes.length - 2]} ${styles.lastOdd}`} />
          )
        }
      </article>
    </>
  );
};

export default IngredientSection;
