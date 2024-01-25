import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../hooks';
import { reorderIngredients } from '../../services/actions/ingredients';
import styles from './mobile-draggable-ingredient.module.css';
import TItemType from '../../types/ItemType';
import { TDraggableIngredientItem } from '../../types';
import { useLanguage } from '../../utils/languageContext';

type TDraggableIngredientProp = {
  ingredient: TItemType;
  index: number;
}

const DraggableIngredient: FC<TDraggableIngredientProp> = ({
  ingredient, index,
}) => {
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const [, refDrag] = useDrag({
    type: 'ingredient',
    // eslint-disable-next-line no-underscore-dangle
    item: { id: ingredient._id, index, fromConstructor: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, refDrop] = useDrop({
    accept: 'ingredient',
    drop: (dragItem: TDraggableIngredientItem) => {
      if (dragItem.index !== index) {
        dispatch(reorderIngredients({ oldIndex: dragItem.index, newIndex: index }));
      }
      // eslint-disable-next-line no-param-reassign
      dragItem.index = index;
    },
  });

  const ref: React.RefCallback<HTMLElement> = (node) => {
    refDrag(node);
    refDrop(node);
  };

  return (
    <div ref={ref} className={styles.draggableIngredientMobile}>
      <DragIcon type="primary" />
      <div className={styles.ingredientDataMobile}>
        <img className={styles.mobileImg} src={ingredient.image_mobile} alt={t(ingredient.name)} />
        <p
          className={`text text_type_main-small mt-1 ${styles.mobileConstructorText}`}
        >
          {t(ingredient.name)}
        </p>
        <div className={styles.mobilePrice}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default DraggableIngredient;
