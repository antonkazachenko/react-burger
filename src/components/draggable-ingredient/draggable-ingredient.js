import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { reorderIngredients } from '../../services/actions/ingredients';
import styles from './draggable-ingredient.module.css';

function DraggableIngredient({ ingredient, handleIngredientRemoval, index }) {
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
        reorderIngredients({ oldIndex: dragItem.index, newIndex: index });
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
        handleClose={() => handleIngredientRemoval(ingredient.uniqueId)}
      />
    </div>
  );
}

DraggableIngredient.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ingredient: PropTypes.object.isRequired,
  handleIngredientRemoval: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default DraggableIngredient;
