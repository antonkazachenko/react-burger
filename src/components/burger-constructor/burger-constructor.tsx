import React, { FC, useEffect, useState } from 'react';
import {
  Button, ConstructorElement, CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {
  createOrderRequest,
  addIngredient,
  removeIngredient,
  changeBun,
  setTotalPrice,
  resetConstructor, TItemTypeWithUniqueId,
} from '../../services/actions/ingredients';
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';
import { WithModalControlsReturn } from '../../hocs/with-modal-control';
import TItemType from '../../types/ItemType';

type TBurgerConstructorProp = {
  className: string;
  handleCloseModal: () => void;
  handleModal: () => void;
}

const BurgerConstructor: FC<TBurgerConstructorProp & WithModalControlsReturn> = ({
  className, handleCloseModal, handleModal,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    constructorIngredients,
    bunData,
  } = useSelector((store) => store.ingredientsStore);
  const { name } = useSelector((store) => store.accountStore.user);
  const { totalPrice } = useSelector((store) => store.ingredientsStore);

  const handleIngredientRemoval = (id: string | undefined): void => {
    if (typeof id === 'undefined') { return; }
    // eslint-disable-next-line no-underscore-dangle
    dispatch(removeIngredient(id));
  };

  const handleCloseModalWithReset = (): void => {
    setIsVisible(false);
    handleCloseModal();
    dispatch(resetConstructor());
  };

  const [, dropTarget] = useDrop({
    accept: ['bun', 'sauce'],
    drop(item: TItemType) {
      if (item && item.type === 'bun') {
        dispatch(changeBun(item));
      } else if (bunData !== null) {
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
      constructorIngredients.forEach((el: { ingredient: TItemTypeWithUniqueId }) => {
        totalPriceValue += el.ingredient.price;
      });
    }
    if (totalPriceValue === 0) {
      dispatch(setTotalPrice(0));
    } else {
      dispatch(setTotalPrice(totalPriceValue));
    }
  }, [bunData, constructorIngredients, dispatch]);

  const createOrder = (): void => {
    if (!name) {
      navigate('/login', { replace: true });
    }
    const ingredientsArray = [];
    if (!bunData) { return; }
    // eslint-disable-next-line no-underscore-dangle
    ingredientsArray.push(bunData._id);
    constructorIngredients.forEach((el) => {
      // eslint-disable-next-line no-underscore-dangle
      ingredientsArray.push(el.ingredient._id);
    });
    // eslint-disable-next-line no-underscore-dangle
    ingredientsArray.push(bunData._id);
    setIsVisible(true);
    dispatch(createOrderRequest(ingredientsArray));
    handleModal();
  };
  if (bunData === null) {
    return (
      <div className={styles.dropZone} ref={dropTarget}>
        <p className="text text_type_main-large mt-10">Перенесите булку в правую часть экрана</p>
      </div>
    );
  }
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
            {constructorIngredients.map(
              (el, index) => {
                if (el.ingredient.type !== 'bun') {
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
              },
            )}
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
          isVisible
          && (
            <Modal onClose={handleCloseModalWithReset} className={styles.modalWidth}>
              <OrderDetails />
            </Modal>
          )
        }
      </div>
    </div>
  );
};

export default BurgerConstructor;
