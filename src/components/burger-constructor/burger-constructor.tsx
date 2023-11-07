import React, { FC, useEffect, useState } from 'react';
import {
  Button, ConstructorElement, CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
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
import { WithModalControlsReturn } from '../../hocs/with-modal-control';

type TItemType = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}
// const initialState = {
//   ingredients: [],
//   bunData: [],
//   isLoading: true,
//   error: null,
//   constructorIngredients: [],
//   createdOrder: null,
//   currentItem: null,
//   totalPrice: 0,
//   isLoadingOrder: false,
//   orderModalVisible: false,
// };

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
  // TODO: remove these any's
  const {
    constructorIngredients,
    bunData,
  } = useSelector((store: any) => store.ingredientsStore);
  const { name } = useSelector((store: any) => store.accountStore.user);
  const { totalPrice } = useSelector((store: any) => store.ingredientsStore);

  const handleIngredientRemoval = (id: string) => {
    // eslint-disable-next-line no-underscore-dangle
    dispatch(removeIngredient(id));
  };

  const handleCloseModalWithReset = () => {
    setIsVisible(false);
    handleCloseModal();
    dispatch({ type: RESET_CONSTRUCTOR });
  };

  const [, dropTarget] = useDrop({
    accept: ['bun', 'sauce'],
    drop(item: TItemType) {
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
      // TODO: remove this any
      constructorIngredients.forEach((el: any) => {
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
    if (!name) {
      navigate('/login', { replace: true });
    }
    const ingredientsArray = [];
    // eslint-disable-next-line no-underscore-dangle
    ingredientsArray.push(bunData._id);
    constructorIngredients.forEach((el: TItemType) => {
      // eslint-disable-next-line no-underscore-dangle
      ingredientsArray.push(el._id);
    });
    // eslint-disable-next-line no-underscore-dangle
    ingredientsArray.push(bunData._id);
    // eslint-disable-next-line no-underscore-dangle
    setIsVisible(true);
    // TODO: remove this any
    dispatch<any>(createOrderRequest(ingredientsArray));
    handleModal();
  };
  if (bunData.length === 0) {
    return (
      <div className={styles.dropZone} ref={dropTarget}>
        <p className="text text_type_main-large mt-10">Перенесите булку в правую часть экрана</p>
      </div>
    );
  }
  // TODO: remove this any
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
            {constructorIngredients.map((el: any, index: number) => {
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
