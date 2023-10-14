import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import styles from './constructor-card.module.css';
import { ADD_INGREDIENT, CHANGE_BUN } from '../../services/actions/ingredients';

function ConstructorCard(props) {
  const {
    item, className, counterCheck, price, onClick,
  } = props;

  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector((store) => store.ingredientsStore);

  function customClick() {
    onClick({ data: item, isCheckout: false });
    console.log(constructorIngredients);
    if (item && item.type === 'bun') {
      dispatch({ type: CHANGE_BUN, payload: item });
      // eslint-disable-next-line no-underscore-dangle,max-len
    } else if ((constructorIngredients.length === 0) || (constructorIngredients.every((el) => el._id !== item._id))) {
      dispatch({ type: ADD_INGREDIENT, payload: item });
    }
  }

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={`${styles.card} ${className}`} onClick={customClick}>
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
      { counterCheck && <Counter count={1} size="default" extraClass="m-1" /> }
    </div>
  );
}

ConstructorCard.defaultProps = {
  counterCheck: false,
};

ConstructorCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
  counterCheck: PropTypes.bool,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ConstructorCard;
