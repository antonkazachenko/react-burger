import React, { useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-orders-feed.module.css';
import data from '../../utils/data';
// Import data
const UserOrdersFeed = () => {
  const imageUrl = data[0]?.image;
  const imageUrl2 = data[1]?.image;

  useEffect(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .${styles.cardImageWithOpacity}::before {
        background-image: url('${imageUrl}');
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up the style tag on component unmount
      document.head.removeChild(style);
    };
  }, [imageUrl]);

  return (
    <div className={`${styles.card} mt-5`}>
      <div className={styles.cardHeader}>
        <p className="text text_type_digits-default">#034535</p>
        <p className={`text text_type_main-small ${styles.date}`}>Сегодня, 16:20</p>
      </div>
      <div className="mt-6 mb-6">
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
export default UserOrdersFeed;