import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
import styles from './constructor-card.module.css';
import { ADD_INGREDIENT, CHANGE_BUN } from '../../services/actions/ingredients';

function ConstructorCard(props) {
  const {
    item, className, price, onClick,
  } = props;
  const dispatch = useDispatch();
  const ingredientCount = useSelector((store) => {
    const ingredient
      // eslint-disable-next-line no-underscore-dangle,operator-linebreak
      = store.ingredientsStore.constructorIngredients.find((el) => el.ingredient._id === item._id);
    return ingredient ? ingredient.count : 0;
  });

  const [, dragBunRef] = useDrag({
    type: 'bun',
    item,
  });
  const [, dragSauceRef] = useDrag({
    type: 'sauce',
    item,
  });

  function customClick() {
    const itemCopy = { ...item };
    itemCopy.id = nanoid();

    onClick({ data: item, isCheckout: false });

    if (itemCopy && itemCopy.type === 'bun') {
      dispatch({ type: CHANGE_BUN, payload: itemCopy });
    } else {
      dispatch({ type: ADD_INGREDIENT, payload: itemCopy });
    }
  }
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={`${styles.card} ${className}`} onClick={customClick} ref={item.type === 'bun' ? dragBunRef : dragSauceRef}>
      <img className="pl-4 pr-4" src={item.image} alt={item.name} />
      <div className={`${styles.flex} mt-1`}>
        <p className="text text_type_digits-default mr-1">
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default mt-1 ${styles.textCenter}`}>
        {item.name}
      </p>
      { ingredientCount > 0 ? <Counter count={ingredientCount} size="default" extraClass="m-1" /> : null }
    </div>
  );
}

ConstructorCard.defaultProps = {
  className: '',
};

ConstructorCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ConstructorCard;
