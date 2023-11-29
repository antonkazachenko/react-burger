import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import styles from '../../components/order-feed/order-feed.module.css';
import { TOrder } from '../../services/reducers/order-feed';
import { useSelector } from '../../hooks';

const NonModalOrderFeedPage = () => {
  const { number } = useParams();
  const { ingredients } = useSelector((store) => store.ingredientsStore);
  const { orders } = useSelector((store) => store.orderFeedStore);
  const orderData = orders.filter(
    (order) => order.number === parseInt(number as string, 10),
  )[0];

  const calculateTotalPrice = (order: TOrder) => {
    // eslint-disable-next-line no-underscore-dangle
    const orderIngredients = ingredients.filter((item) => order.ingredients.includes(item._id));
    return orderIngredients.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <div className="ml-10 mr-10">
      <div className="mt-10 mb-3">
        <p className="text text_type_main-medium">{orderData.name}</p>
      </div>
      <div className="mb-15">
        <p className={`${styles.statusColor} text text_type_main-default`}>{orderData.status}</p>
      </div>
      <div className="mb-6">
        <p className="text text_type_main-medium">Состав:</p>
      </div>
      <div className={styles.overflow}>
        {
          orderData.ingredients.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <div className={`${styles.imagesContainer} ${index !== 0 ? 'mt-4' : ''}`}>
              <div className={styles.ingredientName}>
                <div
                  className={styles.cardImages}
                  style={{
                    // eslint-disable-next-line no-underscore-dangle
                    backgroundImage: `url(${ingredients.find((ingredient) => ingredient._id === item)?.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
                {/* eslint-disable-next-line no-underscore-dangle */}
                <p className="text text_type_main-default ml-4">{ingredients.find((ingredient) => ingredient._id === item)?.name}</p>
              </div>
              <div className={styles.ingredientName}>
                {/* eslint-disable-next-line no-underscore-dangle */}
                <p className="text text_type_digits-medium mr-2 ml-4">{ingredients.find((ingredient) => ingredient._id === item)?.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))
        }
      </div>
      <div className={styles.cardFooter}>
        <div>
          <p className="text text_type_main-default text_color_inactive">Вчера, 13:50</p>
        </div>
        <div className={`${styles.ingredientName} mb-5`}>
          <p className="text text_type_digits-medium mr-2 ml-4">{calculateTotalPrice(orderData)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default NonModalOrderFeedPage;