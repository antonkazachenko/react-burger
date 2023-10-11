import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import { ReactComponent as OrderConfirmationTick } from '../../images/orderConfirmedTick.svg';

function OrderDetails({ modalData }) {
  return (
    <div className={`${styles.orderDetails}`}>
      <div>
        <p className={`${styles.orderNumber} text text_type_digits-large mt-15`}>{modalData.order.number}</p>
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

OrderDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  modalData: PropTypes.object.isRequired,
};
export default OrderDetails;
