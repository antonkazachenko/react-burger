import React from 'react';
import styles from './feed-data.module.css';
import { useSelector } from '../../hooks';

const FeedData = () => {
  const { total, totalToday, orders } = useSelector((state) => state.orderFeedStore);

  const getOrdersByStatus = (status: string, start: number, end: number) => orders
    .filter((order) => order.status === status)
    .slice(start, end)
    .map((order) => (
      // eslint-disable-next-line no-underscore-dangle
      <p key={order._id} className={`text text_type_digits-default mb-2 ${styles.readyColor}`}>
        {order.number}
      </p>
    ));

  return (
    <div>
      <div className={`${styles.flex} mb-15`}>
        <div className={`mr-9 ${styles.statusWidth}`}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={styles.flex}>
            <div>
              {getOrdersByStatus('done', 0, 10)}
            </div>
            <div className="ml-4">
              {getOrdersByStatus('done', 10, 20)}
            </div>
          </div>
        </div>
        <div className={styles.statusWidth}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div>
            <div>
              {getOrdersByStatus('pending', 0, 10)}
            </div>
            <div className="ml-4">
              {getOrdersByStatus('pending', 10, 20)}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${styles.btnGlow}`}>{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.btnGlow}`}>{totalToday}</p>
      </div>
    </div>
  );
};

export default FeedData;
