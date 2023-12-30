import React, { FC } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { useSelector } from '../../hooks';
import styles from './order-details.module.css';
import { ReactComponent as OrderConfirmationTick } from '../../images/orderConfirmedTick.svg';
import { useLanguage } from '../../utils/languageContext';

const OrderDetails: FC<object> = () => {
  const { createdOrder } = useSelector((store) => store.ingredientsStore);
  const { t } = useLanguage();

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
        <p className="text text_type_main-medium mt-8">{t('orderNumber')}</p>
      </div>
      <div className="mt-15">
        <OrderConfirmationTick />
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">{t('orderStarted')}</p>
      </div>
      <div className={`mt-2 mb-30 ${styles.textCenter}`}>
        <p className="text text_type_main-medium">{t('waitForReady')}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
