import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import styles from './order-feed-page.module.css';
import OrderFeed from '../../components/order-feed/order-feed';
import FeedData from '../../components/feed-data/feed-data';
import withModalControl from '../../hocs/with-modal-control';
import { orderFeedConnect, orderFeedDisconnect } from '../../services/actions/order-feed';
import { useSelector } from '../../hooks';
import { TOrder } from '../../services/reducers/order-feed';
import WebsocketStatus from '../../types/websocket';

const OrderFeedWithModalControl = withModalControl(OrderFeed);

const OrderFeedPage: FC = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((store) => store.orderFeedStore);
  const { ingredients } = useSelector((store) => store.ingredientsStore);
  const location = useLocation();
  const calculateTotalPrice = (order: TOrder) => {
    // eslint-disable-next-line no-underscore-dangle
    const orderIngredients = ingredients.filter((item) => order.ingredients.includes(item._id));
    return orderIngredients.reduce((acc, item) => acc + item.price, 0);
  };

  // FOR DISTINCT PICTURES
  // eslint-disable-next-line no-underscore-dangle
  // const orderIngredients = ingredients.filter((item) => order.ingredients.includes(item._id));
  // return orderIngredients.map((item) => item.image);

  const findIngredientImages = (order: TOrder) => order.ingredients.map((ingredientId) => {
    // eslint-disable-next-line no-underscore-dangle
    const ingredient = ingredients.find((item) => item._id === ingredientId);
    return ingredient ? ingredient.image : '';
  });

  useEffect(() => {
    dispatch(orderFeedConnect('wss://norma.nomoreparties.space/orders/all'));
    return () => {
      dispatch(orderFeedDisconnect());
    };
  }, [dispatch]);

  if (status !== WebsocketStatus.ONLINE) {
    return (
      <div className={styles.spinner}>
        <MoonLoader
          color="rgb(133, 133, 173, 1)"
          cssOverride={{}}
          loading
          size={100}
          speedMultiplier={1}
        />
      </div>
    );
  }

  return (
    <main className={styles.app}>
      <div className="mt-10">
        <p className="text text_type_main-large">Лента заказов</p>
      </div>
      <div className={styles.flex}>
        <div className={`${styles.tabWidth} ${styles.overflow}`}>
          { orders.map((order) => (
            // eslint-disable-next-line no-underscore-dangle
            <Link to={`/feed/${order.number}`} key={order._id} state={{ from: 'orderFeed', backgroundLocation: location }} className={styles.link}>
              <OrderFeedWithModalControl
              /* eslint-disable-next-line no-underscore-dangle */
                key={order._id}
                orderNumber={order.number}
                orderName={order.name}
                orderPrice={calculateTotalPrice(order)}
                ingredientImages={findIngredientImages(order)}
                date={order.createdAt}
              />
            </Link>
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
