import React, { useEffect } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import styles from './non-modal-order-feed-page.module.css';
import { TOrder } from '../../services/reducers/order-feed';
import { useDispatch, useSelector } from '../../hooks';
import { getOrderByID } from '../../services/actions/order-feed';
import RequestStatus from '../../types/requestStatus';

const NonModalOrderFeedPage = () => {
  const { number } = useParams();
  const { ingredients } = useSelector((store) => store.ingredientsStore);
  const { orderPage } = useSelector((store) => store.orderFeedStore);
  const { orderPageStatus } = useSelector((store) => store.orderFeedStore);
  const orderData = orderPage[0];
  const dispatch = useDispatch();

  const calculateTotalPrice = (order: TOrder) => {
    // eslint-disable-next-line no-underscore-dangle
    const orderIngredients = ingredients.filter((item) => order.ingredients.includes(item._id));
    return orderIngredients.reduce((acc, item) => acc + item.price, 0);
  };

  const handleStatus = (status: string) => {
    switch (status) {
      case 'done':
        return 'Выполнен';
      case 'pending':
        return 'Готовится';
      case 'created':
        return 'Создан';
      default:
        return 'Неизвестно';
    }
  };

  const handleStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return styles.doneColor;
      case 'pending':
        return styles.pendingColor;
      case 'created':
        return styles.createdColor;
      default:
        return styles.doneColor;
    }
  };

  useEffect(() => {
    if (number !== undefined) dispatch(getOrderByID(number));
  }, [dispatch, number]);

  if (orderPageStatus !== RequestStatus.SUCCEEDED) {
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
  // TODO: fix margins to adaptivity
  return (
    <div className={styles.cardFlex}>
      <div className={styles.orderNumberMargin}>
        <p className="text text_type_digits-medium">
          #
          {orderData.number}
        </p>
      </div>
      <div className="ml-10 mr-10">
        <div className="mt-10 mb-3">
          <p className="text text_type_main-medium">{orderData.name}</p>
        </div>
        <div className="mb-15">
          <p className={`${handleStatusColor(orderData.status)} text text_type_main-default`}>{handleStatus(orderData.status)}</p>
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
                  <p
                    className="text text_type_main-default ml-4"
                  >
                    {/* eslint-disable-next-line no-underscore-dangle */}
                    {ingredients.find((ingredient) => ingredient._id === item)?.name}
                  </p>
                </div>
                <div className={styles.ingredientName}>
                  <p
                    className="text text_type_digits-medium mr-2 ml-4"
                  >
                    {/* eslint-disable-next-line no-underscore-dangle */}
                    {ingredients.find((ingredient) => ingredient._id === item)?.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))
          }
        </div>
        <div className={styles.cardFooter}>
          <div>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(orderData.createdAt)} />
            </p>
          </div>
          <div className={`${styles.ingredientName} mb-5`}>
            <p className="text text_type_digits-medium mr-2 ml-4">{calculateTotalPrice(orderData)}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonModalOrderFeedPage;
