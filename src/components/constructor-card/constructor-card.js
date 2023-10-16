import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import styles from './constructor-card.module.css';

function ConstructorCard(props) {
  const {
    item, className, price, onClick,
  } = props;
  const ingredientCount = useSelector((store) => {
    if (item.type !== 'bun') {
      return store.ingredientsStore.constructorIngredients
        // eslint-disable-next-line no-underscore-dangle
        .filter((el) => el.ingredient._id === item._id).length;
    }
    return store.ingredientsStore.bunData === item ? 1 : 0;
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
    onClick({ data: item });
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
