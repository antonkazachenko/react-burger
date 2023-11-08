import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { reorderIngredients } from '../../services/actions/ingredients';
import styles from './draggable-ingredient.module.css';
import TItemType from '../../types/ItemType';

type TDraggableIngredientProp = {
    ingredient: TItemType;
    handleIngredientRemoval: (id: string | undefined) => void;
    index: number;
}

type TDraggableIngredientItem = {
  id: string;
  index: number;
  fromConstructor: boolean;
}

const DraggableIngredient: FC<TDraggableIngredientProp> = ({
  ingredient, handleIngredientRemoval, index,
}) => {
  const dispatch = useDispatch();

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
    <div ref={ref} className={`${styles.dragElement} mb-4`}>
      <div className="mr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        /* eslint-disable-next-line no-underscore-dangle */
        handleClose={() => handleIngredientRemoval(ingredient.uniqueId)}
      />
    </div>
  );
};

export default DraggableIngredient;
