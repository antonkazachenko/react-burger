import React, { useContext, useEffect } from 'react';
import {
  Button, ConstructorElement, CurrencyIcon, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import IngredientsContext from '../../services/ingredientsContext';
import OrderDetails from '../order-details/order-details';
import OrderContext from '../../services/orderContext';
import { BASE_URL, checkResponse } from '../../utils/api';
import Modal from '../modal/modal';

function BurgerConstructor({
  className, isVisible, handleModal, handleCloseModal,
}) {
  const { data, totalPriceDispatcher, totalPrice } = useContext(IngredientsContext);
  const [modalData, setModalData] = React.useState(null);
  const { bunData, orderData } = useContext(OrderContext);

  useEffect(() => {
    let accumulatedPrice = data.reduce((acc, el) => ((el.type !== 'bun') ? acc + el.price : acc), 0);
    accumulatedPrice += data[0].price * 2;
    totalPriceDispatcher({ type: 'set', payload: accumulatedPrice });
  }, [data, totalPriceDispatcher]);

  const createOrder = () => {
    const ingredientsArray = [];
    data.forEach((el) => {
      // eslint-disable-next-line no-underscore-dangle
      ingredientsArray.push(el._id);
    });
    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        ingredients: ingredientsArray,
      }),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        setModalData(res);
        handleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // TODO: What is the initial state of bunData?
  return (
    <div className={className}>
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
        orderData && orderData.length ? (
          <div className={styles.overflow}>
            {
            orderData.map((el) => {
              if (el.type !== 'bun') {
                console.log(el);
                return (
                  // eslint-disable-next-line no-underscore-dangle
                  <div className={`${styles.dragElement} mb-4`} key={el._id}>
                    <div className="mr-2">
                      <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image}
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
          isVisible
          && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails modalData={modalData} />
          </Modal>
          )
          // <OrderDetails modalData={modalData} onClose={handleCloseModal}/>
        }
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  className: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
