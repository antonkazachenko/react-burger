import React, { useContext, useEffect } from 'react';
import {
  Button, ConstructorElement, CurrencyIcon, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
import styles from './burger-constructor.module.css';
import IngredientsContext from '../../services/ingredientsContext';
import OrderDetails from '../order-details/order-details';
// eslint-disable-next-line import/named
import { createOrderRequest } from '../../utils/api';
import Modal from '../modal/modal';
import { ADD_INGREDIENT, CHANGE_BUN } from '../../services/actions/ingredients';

function BurgerConstructor({
  className, handleCloseModal, isVisible, handleModal,
}) {
  const dispatch = useDispatch();
  const {
    constructorIngredients,
    bunData,
    createdOrder,
  } = useSelector((store) => store.ingredientsStore);
  const { totalPriceDispatcher, totalPrice } = useContext(IngredientsContext);

  const handleIngredientRemoval = (id) => {
    // eslint-disable-next-line no-underscore-dangle
    dispatch({ type: 'REMOVE_INGREDIENT', payload: id });
  };

  const [, dropTarget] = useDrop({
    accept: ['bun', 'sauce'],
    drop(item) {
      const itemCopy = { ...item };
      itemCopy.id = nanoid();

      if (itemCopy && itemCopy.type === 'bun') {
        dispatch({ type: CHANGE_BUN, payload: itemCopy });
      } else {
        dispatch({ type: ADD_INGREDIENT, payload: itemCopy });
      }
    },
  });

  useEffect(() => {
    let totalPriceValue = 0;
    if (bunData) {
      totalPriceValue += bunData.price * 2;
    }
    if (constructorIngredients) {
      constructorIngredients.forEach((el) => {
        totalPriceValue += el.ingredient.price * el.count;
      });
    }
    if (totalPriceValue === 0) {
      totalPriceDispatcher({ type: 'reset' });
    } else {
      totalPriceDispatcher({ type: 'set', payload: totalPriceValue });
    }
  }, [totalPriceDispatcher, bunData, constructorIngredients]);

  const createOrder = () => {
    const ingredientsArray = [];
    // eslint-disable-next-line no-underscore-dangle
    ingredientsArray.push(bunData._id);
    constructorIngredients.forEach((el) => {
      // eslint-disable-next-line no-underscore-dangle
      ingredientsArray.push(el._id);
    });
    // eslint-disable-next-line no-underscore-dangle
    ingredientsArray.push(bunData._id);
    // eslint-disable-next-line no-underscore-dangle
    dispatch(createOrderRequest(ingredientsArray));
    handleModal();
  };
  // TODO: What is the initial state of bunData?
  return (
    <div className={className} ref={dropTarget}>
      <div className={`${styles.dragElement} ml-8 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${bunData.name} (верх)`}
          price={bunData.price}
          thumbnail={bunData.image}
        />
      </div>
      {
        constructorIngredients && constructorIngredients.length ? (
          <div className={styles.overflow}>
            {
            constructorIngredients.map((el) => {
              if (el.type !== 'bun') {
                return (
                  // eslint-disable-next-line no-underscore-dangle
                  <div className={`${styles.dragElement} mb-4`} key={el.ingredient._id}>
                    <div className="mr-2">
                      <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                      text={el.ingredient.name}
                      price={el.ingredient.price}
                      thumbnail={el.ingredient.image}
                      /* eslint-disable-next-line no-underscore-dangle */
                      handleClose={() => handleIngredientRemoval(el.ingredient._id)}
                    />
                  </div>
                );
              }
              return null;
            })
}
          </div>
        ) : null
      }
      <div className={`${styles.dragElement} ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${bunData.name} (низ)`}
          price={bunData.price}
          thumbnail={bunData.image}
        />
      </div>
      <div className={`${styles.dragElement} mr-4 mt-6 mt-10`}>
        <p className="text text_type_digits-medium mr-1">{totalPrice.price}</p>
        <div className="mr-10">
          <CurrencyIcon type="primary" />
        </div>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={createOrder}>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
        {
          isVisible && createdOrder
          && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
          )
        }
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  className: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default BurgerConstructor;
