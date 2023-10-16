import React, { useEffect } from 'react';
import {
  Button, ConstructorElement, CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
// eslint-disable-next-line import/named
import Modal from '../modal/modal';
import {
  createOrderRequest,
  addIngredient,
  removeIngredient,
  changeBun,
  setTotalPrice,
  resetTotalPrice, RESET_CONSTRUCTOR,
} from '../../services/actions/ingredients';
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';

function BurgerConstructor({
  className, handleCloseModal, isVisible, handleModal,
}) {
  const { isLoadingOrder } = useSelector((store) => store.ingredientsStore);
  const dispatch = useDispatch();
  const {
    constructorIngredients,
    bunData,
    createdOrder,
  } = useSelector((store) => store.ingredientsStore);
  const { totalPrice } = useSelector((store) => store.ingredientsStore);

  const handleIngredientRemoval = (id) => {
    // eslint-disable-next-line no-underscore-dangle
    dispatch(removeIngredient(id));
  };

  const handleCloseModalWithReset = () => {
    handleCloseModal();
    dispatch({ type: RESET_CONSTRUCTOR });
  };

  const [, dropTarget] = useDrop({
    accept: ['bun', 'sauce'],
    drop(item) {
      if ((bunData.length === 0) && (item.type !== 'bun')) { return; }
      if (item && item.type === 'bun') {
        dispatch(changeBun(item));
      } else {
        dispatch(addIngredient(item));
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
        totalPriceValue += el.ingredient.price;
      });
    }
    if (totalPriceValue === 0) {
      dispatch(resetTotalPrice());
    } else {
      dispatch(setTotalPrice(totalPriceValue));
    }
  }, [bunData, constructorIngredients, dispatch]);

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
  // TODO: add better loader
  if (bunData.length === 0) {
    return (
      <div className={styles.dropZone} ref={dropTarget}>
        <p className="text text_type_main-large mt-10">Перенесите булку в правую часть экрана</p>
      </div>
    );
  }
  return (
    <div className={className} ref={dropTarget}>
      {isLoadingOrder && <div>Loading...</div>}

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
            {constructorIngredients.map((el, index) => {
              if (el.type !== 'bun') {
                return (
                  <DraggableIngredient
                    /* eslint-disable-next-line no-underscore-dangle */
                    key={el.ingredient.uniqueId}
                    ingredient={el.ingredient}
                    handleIngredientRemoval={handleIngredientRemoval}
                    index={index}
                  />
                );
              }
              return null;
            })}
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
        <p className="text text_type_digits-medium mr-1">{Number.isNaN(totalPrice) ? 0 : totalPrice}</p>
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
          <Modal onClose={handleCloseModalWithReset} className={styles.modalWidth}>
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
