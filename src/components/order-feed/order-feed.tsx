import React, { FC, useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-feed.module.css';
import data from '../../utils/data'; // Import data
import Modal from '../modal/modal';
import OrderFeedDetails from '../order-feed-details/order-feed-details';
import { WithModalControlsReturn } from '../../hocs/with-modal-control';

type TOrderFeedProp = {
  handleModal: () => void;
  handleCloseModal: () => void;
  isVisible: boolean;
}

const OrderFeed: FC<TOrderFeedProp & WithModalControlsReturn> = ({
  handleModal,
  handleCloseModal,
  isVisible,
}) => {
  // Ensure data[0] and data[1] and their images exist
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
    <>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={`${styles.card} mt-5 mb-4 mr-2`} onClick={handleModal}>
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
      {isVisible && (
        <Modal onClose={handleCloseModal} title="#2414532" orderFeed className={styles.modalWidth}>
          <OrderFeedDetails />
        </Modal>
      )}
    </>
  );
};

export default OrderFeed;
