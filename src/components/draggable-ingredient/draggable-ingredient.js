import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggable-ingredient.module.css';

function DraggableIngredient({ ingredient, handleIngredientRemoval, index }) {
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
    drop: (dragItem) => {
      if (dragItem.index !== index) {
        dispatch({
          type: 'REORDER_INGREDIENTS',
          payload: {
            oldIndex: dragItem.index,
            newIndex: index,
          },
        });
      }
    },
  });

  const ref = (node) => {
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
        handleClose={() => handleIngredientRemoval(ingredient._id)}
      />
    </div>
  );
}

DraggableIngredient.PropTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ingredient: React.PropTypes.object.isRequired,
  handleIngredientRemoval: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
}

export default DraggableIngredient;
