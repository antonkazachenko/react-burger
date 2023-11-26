import React, { FC } from 'react';
import styles from './order-feed-page.module.css';
import OrderFeed from '../../components/order-feed/order-feed';
import FeedData from '../../components/feed-data/feed-data';

const OrderFeedPage: FC = () => (
  <>
    { /* eslint-disable-next-line react/jsx-no-constructed-context-values */ }
    <main className={styles.app}>
      <div className="mt-10">
        <p className="text text_type_main-large">Лента заказов</p>
      </div>
      <div className={styles.flex}>
        <div className={styles.tabWidth}>
          <OrderFeed />
        </div>
        <div className={`${styles.tabWidth} ml-15`}>
          <FeedData />
        </div>
      </div>
    </main>
  </>
);

export default OrderFeedPage;
