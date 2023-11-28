import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './order-feed-page.module.css';
import OrderFeed from '../../components/order-feed/order-feed';
import FeedData from '../../components/feed-data/feed-data';
import withModalControl from '../../hocs/with-modal-control';
import { orderFeedConnect, orderFeedDisconnect } from '../../services/actions/order-feed';
import { useSelector } from '../../hooks';
import { TOrder } from '../../services/reducers/order-feed';

const OrderFeedWithModalControl = withModalControl(OrderFeed);

const OrderFeedPage: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orderFeedStore);
  const { ingredients } = useSelector((store) => store.ingredientsStore);

  const calculateTotalPrice = (order: TOrder) => {
    // eslint-disable-next-line no-underscore-dangle
    const orderIngredients = ingredients.filter((item) => order.ingredients.includes(item._id));
    return orderIngredients.reduce((acc, item) => acc + item.price, 0);
  };

  const findIngredientImages = (order: TOrder) => {
    // eslint-disable-next-line no-underscore-dangle
    const orderIngredients = ingredients.filter((item) => order.ingredients.includes(item._id));
    return orderIngredients.map((item) => item.image);
  };

  useEffect(() => {
    dispatch(orderFeedConnect('wss://norma.nomoreparties.space/orders/all'));
    return () => {
      dispatch(orderFeedDisconnect());
    };
  }, [dispatch]);

  return (
    <main className={styles.app}>
      <div className="mt-10">
        <p className="text text_type_main-large">Лента заказов</p>
      </div>
      <div className={styles.flex}>
        <div className={`${styles.tabWidth} ${styles.overflow}`}>
          { orders.map((order: TOrder) => (
            <OrderFeedWithModalControl
              /* eslint-disable-next-line no-underscore-dangle */
              key={order._id}
              orderNumber={order.number}
              orderName={order.name}
              orderPrice={calculateTotalPrice(order)}
              ingredientImages={findIngredientImages(order)}
            />
          ))}
        </div>
        <div className={`${styles.tabWidth} ml-15`}>
          <FeedData />
        </div>
      </div>
    </main>
  );
};

export default OrderFeedPage;
