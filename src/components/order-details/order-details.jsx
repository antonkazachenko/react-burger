import React from 'react';
import { useSelector } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import styles from './order-details.module.css';
import { ReactComponent as OrderConfirmationTick } from '../../images/orderConfirmedTick.svg';

function OrderDetails() {
  const { createdOrder } = useSelector((store) => store.ingredientsStore);

  if (!createdOrder) {
    return (
      <div className={`${styles.orderDetails}`}>
        <div className={`${styles.spinner}`}>
          <MoonLoader
            color="rgb(133, 133, 173, 1)"
            cssOverride={{}}
            loading
            size={100}
            speedMultiplier={1}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.orderDetails}`}>
      <div>
        <p className={`${styles.orderNumber} text text_type_digits-large mt-15`}>{createdOrder.order.number}</p>
      </div>
      <div>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      </div>
      <div className="mt-15">
        <OrderConfirmationTick />
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">Ваш заказ начали готовить</p>
      </div>
      <div className="mt-2 mb-30">
        <p className="text text_type_main-medium">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  );
}

export default OrderDetails;
