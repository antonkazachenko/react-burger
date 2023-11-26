import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../order-feed/order-feed.module.css';
import data from '../../utils/data';

const OrderFeedDetails = () => {
  const imageUrl = data[0]?.image;
  const imageUrl2 = data[1]?.image;
  return (
    <div>
      <div className="mt-10 mb-6">
        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.imagesContainer}>
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 5,
            }}
          />
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 4,
              marginLeft: '-15px',
            }}
          />
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 3,
              marginLeft: '-15px',
            }}
          />
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 2,
              marginLeft: '-15px',
            }}
          />
          <div
            className={styles.cardImages}
            style={{
              backgroundImage: `url(${imageUrl2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              zIndex: 1,
              marginLeft: '-15px',
            }}
          />
          <div className={`${styles.cardImageWithOpacity} ${styles.cardImages}`}>
            <p className={`${styles.extraIngredientsTextColor} text text_type_digits-default`}>+3</p>
          </div>
        </div>
        <div className={styles.cardPrice}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFeedDetails;
