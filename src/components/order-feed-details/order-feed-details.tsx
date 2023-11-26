import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../order-feed/order-feed.module.css';
import data from '../../utils/data';

const OrderFeedDetails = () => {
  const imageUrl = data[0]?.image;
  return (
    <div className="ml-10 mr-10">
      <div className="mt-10 mb-3">
        <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
      </div>
      <div className="mb-15">
        <p className={`${styles.statusColor} text text_type_main-default`}>Выполнен</p>
      </div>
      <div className="mb-6">
        <p className="text text_type_main-medium">Состав:</p>
      </div>
      <div className={styles.overflow}>
        <div className={styles.imagesContainer}>
          <div className={styles.ingredientName}>
            <div
              className={styles.cardImages}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                zIndex: 5,
              }}
            />
            <p className={`${styles.ingredientWidth} text text_type_main-default ml-4`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={styles.ingredientName}>
            <p className="text text_type_digits-medium mr-2 ml-4">500</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={`${styles.imagesContainer} mt-4`}>
          <div className={styles.ingredientName}>
            <div
              className={styles.cardImages}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                zIndex: 5,
              }}
            />
            <p className={`${styles.ingredientWidth} text text_type_main-default ml-4`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={styles.ingredientName}>
            <p className="text text_type_digits-medium mr-2 ml-4">500</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={`${styles.imagesContainer} mt-4`}>
          <div className={styles.ingredientName}>
            <div
              className={styles.cardImages}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                zIndex: 5,
              }}
            />
            <p className={`${styles.ingredientWidth} text text_type_main-default ml-4`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={styles.ingredientName}>
            <p className="text text_type_digits-medium mr-2 ml-4">500</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={`${styles.imagesContainer} mt-4`}>
          <div className={styles.ingredientName}>
            <div
              className={styles.cardImages}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                zIndex: 5,
              }}
            />
            <p className={`${styles.ingredientWidth} text text_type_main-default ml-4`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={styles.ingredientName}>
            <p className="text text_type_digits-medium mr-2 ml-4">500</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={`${styles.imagesContainer} mt-4`}>
          <div className={styles.ingredientName}>
            <div
              className={styles.cardImages}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                zIndex: 5,
              }}
            />
            <p className={`${styles.ingredientWidth} text text_type_main-default ml-4`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={styles.ingredientName}>
            <p className="text text_type_digits-medium mr-2 ml-4">500</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={`${styles.imagesContainer} mt-4`}>
          <div className={styles.ingredientName}>
            <div
              className={styles.cardImages}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                zIndex: 5,
              }}
            />
            <p className={`${styles.ingredientWidth} text text_type_main-default ml-4`}>Флюоресцентная булка R2-D3</p>
          </div>
          <div className={styles.ingredientName}>
            <p className="text text_type_digits-medium mr-2 ml-4">500</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div>
          <p className="text text_type_main-default text_color_inactive">Вчера, 13:50</p>
        </div>
        <div className={`${styles.ingredientName} mb-5`}>
          <p className="text text_type_digits-medium mr-2 ml-4">500</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFeedDetails;
