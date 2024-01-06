import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import styles from './ingredient-section.module.css';
import ConstructorCard from '../constructor-card/constructor-card';
import TItemType from '../../types/ItemType';
import { addIngredient } from '../../services/actions/ingredients';
import { useLanguage } from '../../utils/languageContext';

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
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const mobileAddIngredient = (item: TItemType) => {
    dispatch(addIngredient(item));
  };

  return (
    <>
      <p className={`text text_type_main-medium ${styles.mobileSectionTitle}`}>
        {title}
      </p>
      <article className={`${styles.flex} mt-6`}>
        {
          items.map((el, index) => (
            <div
              className={styles.mobileCard}
              /* eslint-disable-next-line no-underscore-dangle */
              key={el._id}
            >
              <Link
              /* eslint-disable-next-line no-underscore-dangle */
                data-cy={`ingredient-${el._id}`}
                /* eslint-disable-next-line no-underscore-dangle */
                className={`${classes[index]} ${styles.navLink}`}
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

              <Button
                onClick={() => mobileAddIngredient(el)}
                htmlType="button"
                type="secondary"
                size="medium"
                extraClass={styles.mobileButton}
              >
                {t('addIngredientMobile')}
              </Button>
            </div>
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
