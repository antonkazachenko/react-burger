import React, { FC } from 'react';
import styles from './order-feed-page.module.css';
import OrderFeed from '../../components/order-feed/order-feed';
import FeedData from '../../components/feed-data/feed-data';
import withModalControl from '../../hocs/with-modal-control';

const OrderFeedWithModalControl = withModalControl(OrderFeed);

const OrderFeedPage: FC = () => (
  <main className={styles.app}>
    <div className="mt-10">
      <p className="text text_type_main-large">Лента заказов</p>
    </div>
    <div className={styles.flex}>
      <div className={`${styles.tabWidth} ${styles.overflow}`}>
        <OrderFeedWithModalControl />
        <OrderFeedWithModalControl />
        <OrderFeedWithModalControl />
        <OrderFeedWithModalControl />
      </div>
      <div className={`${styles.tabWidth} ml-15`}>
        <FeedData />
      </div>
    </div>
  </main>
);

export default OrderFeedPage;
